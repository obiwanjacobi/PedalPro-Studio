import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControl, FormControlLabel, RadioGroup, Radio,
    Grid, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Dialog 
} from "material-ui";
import { ApplicationDocument, PresetCollectionType } from "../client/ApplicationDocument";
import { Preset, formatPresetIndex } from "../client/Preset";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { PastePresets, createPastePresetsAction } from "../client/PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../client/screen/UpdateScreenAction";
import { ApplicationToolbar } from "../client/controls/ApplicationToolbar";
import { Clear } from "material-ui-icons";
import { ScreenState } from "../client/screen/ScreenState";
import { SelectedView } from "../client/controls/SelectedView";

interface ClipboardListItemProps {
    preset: Preset;
}
type ClipboardListItemAllProps = ClipboardListItemProps & SelectPresets;

class ClipboardListItem extends React.Component<ClipboardListItemAllProps> {
    public constructor(props: ClipboardListItemAllProps) {
        super(props);
        this.onSelectPreset = this.onSelectPreset.bind(this);
    }

    public render() {
        return (
            <ListItem button={true} onClick={this.onSelectPreset}>
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.preset.uiSelected} />
                <ListItemText primary={this.title} secondary={this.props.preset.source.toUpperCase()} />
                <ListItemSecondaryAction />
            </ListItem>
        );
    }

    private get title() {
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }
    private onSelectPreset(_: React.MouseEvent<HTMLElement>) {
        this.props.selectPresets(
            [this.props.preset], PresetCollectionType.clipboard, 
            { selected: !this.props.preset.uiSelected });
    }
}

interface OverwrittenListItemProps {
    preset: Preset;
}

class OverwrittenListItem extends React.Component<OverwrittenListItemProps> {
    public constructor(props: OverwrittenListItemProps) {
        super(props);
    }

    public render() {
        return (
            <ListItem>
                <ListItemText primary={this.title} secondary={this.props.preset.source.toUpperCase()} />
            </ListItem>
        );
    }

    private get title() {
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }
}

export enum PasteType {
    None = "none",
    Index = "index",
    Name = "name",
    Empty = "empty"
}

export interface PastePageProps {}
export interface PastePageState {
    pasteType: string;
}
export interface PastePageStateProps {
    open: boolean;
    clipboard: Preset[];
    device: Preset[];
}
export type PastePageActions = SelectPresets & CopyPresets & PastePresets & UpdateScreen;
export type PastePageAllProps = PastePageProps & PastePageStateProps & PastePageActions;

export class PastePage extends React.Component<PastePageAllProps, PastePageState> {
    private selection: SelectedView<Preset>;

    public constructor(props: PastePageAllProps) {
        super(props);
        this.state = { pasteType: PasteType.None };
        this.close = this.close.bind(this);
        this.onPasteTypeChange = this.onPasteTypeChange.bind(this);
    }

    public componentWillReceiveProps(newProps: PastePageAllProps) {
        this.selection = new SelectedView(newProps.clipboard);
    }

    public render() {
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                </ApplicationToolbar>
                <Grid container={true}>
                    <Grid item={true} xs={4}>
                        <List id="ClipboardList">
                            {this.props.clipboard.map((preset: Preset, index: number) => {
                                return (
                                    <ClipboardListItem 
                                        key={index} 
                                        preset={preset} 
                                        selectPresets={this.props.selectPresets}
                                    />
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormControl component="fieldset">
                            <RadioGroup value={this.state.pasteType} onChange={this.onPasteTypeChange}>
                                <FormControlLabel 
                                    value={PasteType.Index} 
                                    label="Replace by Index"
                                    control={<Radio/>} 
                                />
                                <FormControlLabel 
                                    value={PasteType.Name} 
                                    label="Replace by Name"
                                    control={<Radio/>} 
                                />
                                <FormControlLabel 
                                    value={PasteType.Empty} 
                                    label="Replace empty."
                                    control={<Radio/>} 
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <List id="DeviceList">
                            {this.overwrittenPresets().map((preset: Preset, index: number) => {
                                return (
                                    <OverwrittenListItem
                                        key={index} 
                                        preset={preset}
                                    />
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </Dialog>
        );
    }

    private onPasteTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({pasteType: event.target.value});
    }

    private overwrittenPresets(): Preset[] {
        switch (this.state.pasteType) {
            case PasteType.Empty:
                return this.props.device.filter((p: Preset) => p.traits.empty).slice(0, this.selection.selected.length);
            case PasteType.Index:
                const byIndex = new Array<Preset>(this.selection.selected.length);
                this.selection.selected.forEach((p: Preset, index: number) => {
                    const found = this.props.device.find((d: Preset) => d.index === p.index);
                    if (found) { byIndex[index] = found; }
                });
                return byIndex;
            case PasteType.Name:
                const byName = new Array<Preset>(this.selection.selected.length);
                this.selection.selected.forEach((p: Preset, index: number) => {
                    const found = this.props.device.find((d: Preset) => d.name === p.name);
                    if (found) { byName[index] = found; }
                });
                return byName;
            default:
                return [];
        }
    }

    private close() {
        this.props.updateScreen(new ScreenState());
    }
}

const extractComponentPropsFromState: MapStateToProps<
        PastePageStateProps, PastePageProps, ApplicationDocument
    > = (state: ApplicationDocument, _: PastePageProps): PastePageStateProps => {
        return  { device: state.device, clipboard: state.clipboard, open: state.screen.pasteOpen };
};

const createActionObject: MapDispatchToPropsFunction<PastePageActions, PastePageProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: PastePageProps): PastePageActions => {
        return {
            selectPresets: (presets: Preset[], source: PresetCollectionType, command: 
                {selected?: boolean, expanded?: boolean}): void => {
                dispatch(createSelectPresetsAction(presets, source, command));
            },
            copyPresets: (presets: Preset[]): void => {
                dispatch(createCopyPresetsAction(presets));
            },
            pastePresets: (presets: Preset[], target: PresetCollectionType): void => {
                dispatch(createPastePresetsAction(presets, target));
            },
            updateScreen: (state: ScreenState): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(PastePage);