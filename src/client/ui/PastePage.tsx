import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControl, FormControlLabel, RadioGroup, Radio,
    Grid, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Dialog, Typography, Button 
} from "material-ui";
import { Clear } from "material-ui-icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset, formatPresetIndex, ItemUI } from "../Preset";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { ScreenState } from "../screen/ScreenState";
import { SelectedView } from "../controls/SelectedView";
import { PresetChangedFlag } from "./PresetChangedFlag";

interface ClipboardListItemProps {
    preset: Preset;
}
type ClipboardListItemAllProps = ClipboardListItemProps & ChangePresets;

class ClipboardListItem extends React.Component<ClipboardListItemAllProps> {
    public constructor(props: ClipboardListItemAllProps) {
        super(props);
        this.onSelectPreset = this.onSelectPreset.bind(this);
    }

    public render() {
        return (
            <ListItem button={true} onClick={this.onSelectPreset}>
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.preset.ui.selected} />
                <ListItemText primary={this.title} secondary={this.props.preset.source.toUpperCase()} />
                <ListItemSecondaryAction />
            </ListItem>
        );
    }

    private get title() {
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }
    private onSelectPreset(_: React.MouseEvent<HTMLElement>) {
        this.props.changePresets(
            [this.props.preset], PresetCollectionType.clipboard, 
            { selected: !this.props.preset.ui.selected });
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
                <ListItemText primary={this.title} secondary={this.props.preset.origin.name} />
                <ListItemSecondaryAction>
                    {!this.notFound &&
                    <PresetChangedFlag preset={this.props.preset} />}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private get title() {
        if (this.notFound) { return this.props.preset.name; }
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }

    private get notFound(): boolean {
        return this.props.preset === NotFoundPreset;
    }
}

const NotFoundPreset: Preset = {
    name: "<No Match>",
    index: -1,
    source: PresetCollectionType.device,
    origin: {
        name: "",
        index: -1,
        meta: { device: "" },
        traits: { singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false},
    },
    ui: { selected: false, expanded: false, markedDeleted: false },
    meta: { device: "" },
    traits: { singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false},
};

enum PasteType {
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
export type PastePageActions = ChangePresets & PastePresets & UpdateScreen;
export type PastePageAllProps = PastePageProps & PastePageStateProps & PastePageActions;

export class PastePage extends React.Component<PastePageAllProps, PastePageState> {
    private selection: SelectedView;

    public constructor(props: PastePageAllProps) {
        super(props);
        this.state = { pasteType: PasteType.None };
        this.close = this.close.bind(this);
        this.onPasteTypeChange = this.onPasteTypeChange.bind(this);
        this.overwrite = this.overwrite.bind(this);
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
                    <Typography variant="title" style={{flex: 1}}>Paste Presets</Typography>
                    <Button onClick={this.overwrite} disabled={this.hasResult}>
                        Overwrite
                    </Button>
                </ApplicationToolbar>
                <div style={{padding: 12}}>
                    <Grid container={true} spacing={8}>
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Clipboard</Typography>
                            <List id="ClipboardList">
                                {this.props.clipboard.map((preset: Preset, index: number) => {
                                    return (
                                        <ClipboardListItem 
                                            key={index} 
                                            preset={preset} 
                                            changePresets={this.props.changePresets}
                                        />
                                    );
                                })}
                            </List>
                            <Button>
                                <Typography>Remove Selected</Typography>
                            </Button>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Operation</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup value={this.state.pasteType} onChange={this.onPasteTypeChange}>
                        <FormControlLabel value={PasteType.Index} label="Replace by Index" control={<Radio/>} />
                        <FormControlLabel value={PasteType.Name} label="Replace by Name" control={<Radio/>} />
                        <FormControlLabel value={PasteType.Empty} label="Replace empty." control={<Radio/>} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Overwritten</Typography>
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
                </div>
            </Dialog>
        );
    }

    private get hasResult(): boolean {
        // return lodash.compact(this.overwrittenPresets()).length === 0;
        return this.overwrittenPresets().filter((p: Preset) => p !== NotFoundPreset).length === 0;
    }

    private onPasteTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({pasteType: event.target.value});
    }

    private overwrittenPresets(): Preset[] {
        switch (this.state.pasteType) {
            case PasteType.Empty:
                const empties = this.props.device
                    .filter((p: Preset) => p.traits.empty)
                    .slice(0, this.selection.selected.length);
                return empties.fill(NotFoundPreset, empties.length, this.props.clipboard.length);
            case PasteType.Index:
                const byIndex = new Array<Preset>(this.selection.selected.length);
                this.selection.selected.forEach((p: Preset, index: number) => {
                    const found = this.props.device.find((d: Preset) => d.index === p.index);
                    if (found) { byIndex[index] = found; } else { byIndex[index] = NotFoundPreset; }
                });
                return byIndex;
            case PasteType.Name:
                const byName = new Array<Preset>(this.selection.selected.length);
                this.selection.selected.forEach((p: Preset, index: number) => {
                    const found = this.props.device.find((d: Preset) => d.name === p.name);
                    if (found) { byName[index] = found; } else { byName[index] = NotFoundPreset; }
                });
                return byName;
            default:
                return [];
        }
    }

    private pastedPresets() {
        const overwritten = this.overwrittenPresets();
        const pasted = this.selection.selected.slice();

        for (let i = 0; i < pasted.length; i++) {
            pasted[i] = { ...pasted[i], index: overwritten[i].index };
        }

        return pasted;
    }

    private close() {
        this.props.updateScreen(new ScreenState());
    }

    private overwrite() {
        this.props.pastePresets(this.pastedPresets(), PresetCollectionType.device);
        this.close();
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
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
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