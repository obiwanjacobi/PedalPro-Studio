import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControl, FormControlLabel, RadioGroup, Radio, Select, MenuItem,
    Grid, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Dialog, Typography, Button 
} from "material-ui";
import { Clear } from "material-ui-icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset, formatPresetIndex } from "../Preset";
import { ItemUI } from "../ItemUI";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { ScreenState } from "../screen/ScreenState";
import { SelectedView } from "../controls/SelectedView";
import { PresetChangedFlag } from "../controls/PresetChangedFlag";
import { StorageBank } from "../StorageBank";

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

export interface PastePageProps {
    targetCollection: PresetCollectionType;
    presets: Preset[];
    banks?: StorageBank[];
}
export interface PastePageState {
    pasteType: string;
    removeSelected: boolean;
}
export interface PastePageStateProps {
    open: boolean;
    clipboard: Preset[];
}
export type PastePageActions = ChangePresets & PastePresets & UpdateScreen;
export type PastePageAllProps = PastePageProps & PastePageStateProps & PastePageActions;

export class PastePage extends React.Component<PastePageAllProps, PastePageState> {
    private selection: SelectedView;

    public constructor(props: PastePageAllProps) {
        super(props);
        this.state = { pasteType: PasteType.None, removeSelected: false };
        this.close = this.close.bind(this);
        this.onPasteTypeChange = this.onPasteTypeChange.bind(this);
        this.onRemoveSelectedChange = this.onRemoveSelectedChange.bind(this);
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
                    <Typography variant="subheading" style={{flex: 1}}>
                        {this.props.targetCollection.toUpperCase()}
                    </Typography>
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
                            <FormControlLabel
                                control={<Checkbox 
                                    checked={this.state.removeSelected} 
                                    onChange={this.onRemoveSelectedChange}
                                />}
                                label="Remove after Paste"
                            />
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Operation</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup value={this.state.pasteType} onChange={this.onPasteTypeChange}>
                        <FormControlLabel value={PasteType.Index} label="Replace by Index" control={<Radio/>} />
                        <FormControlLabel value={PasteType.Name} label="Replace by Name" control={<Radio/>} />
                        {this.props.targetCollection !== PresetCollectionType.storage &&
                        <FormControlLabel value={PasteType.Empty} label="Replace empty." control={<Radio/>} />}
                                </RadioGroup>
                            
                                {this.props.banks && this.props.banks.length > 0 &&
                                <React.Fragment>
                                    <Typography variant="body2">Storage Bank</Typography>
                                    <Select value={this.props.banks[0].bank}>
                                        {this.props.banks.map((bank: StorageBank, index: number) => {
                                            return (
                                                <MenuItem key={index} value={bank.bank}>
                                                    <Typography>{bank.bank}</Typography>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </React.Fragment>}

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
        return this.overwrittenPresets().filter((p: Preset) => p !== NotFoundPreset).length === 0;
    }

    private onRemoveSelectedChange() {
        this.modifyState({removeSelected: !this.state.removeSelected});
    }
    private onPasteTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.modifyState({pasteType: event.target.value});
    }

    private modifyState(state: Partial<PastePageState>) {
        this.setState({ ...this.state, ...state });
    }

    private overwrittenPresets(): Preset[] {
        switch (this.state.pasteType) {
            case PasteType.Empty:
                const empties = this.props.presets
                    .filter((p: Preset) => p.traits.empty)
                    .slice(0, this.selection.selected.length);
                return empties.fill(NotFoundPreset, empties.length, this.props.clipboard.length);
            case PasteType.Index:
                const byIndex = new Array<Preset>(this.selection.selected.length);
                this.selection.selected.forEach((p: Preset, index: number) => {
                    const found = this.props.presets.find((d: Preset) => d.index === p.index);
                    if (found) { byIndex[index] = found; } else { byIndex[index] = NotFoundPreset; }
                });
                return byIndex;
            case PasteType.Name:
                const byName = new Array<Preset>(this.selection.selected.length);
                this.selection.selected.forEach((p: Preset, index: number) => {
                    const found = this.props.presets.find((d: Preset) => d.name === p.name);
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
        this.props.updateScreen({ pasteOpen: false });
    }

    private overwrite() {
        this.props.pastePresets(this.pastedPresets(), this.props.targetCollection, this.state.removeSelected);
        this.close();
    }
}

const extractComponentPropsFromState: MapStateToProps<
        PastePageStateProps, PastePageProps, ApplicationDocument
    > = (state: ApplicationDocument, _: PastePageProps): PastePageStateProps => {
        return  { clipboard: state.clipboard, open: state.screen.pasteOpen };
};

const createActionObject: MapDispatchToPropsFunction<PastePageActions, PastePageProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: PastePageProps): PastePageActions => {
        return {
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
            },
            pastePresets: (presets: Preset[], target: PresetCollectionType, deleteAfterPaste: boolean): void => {
                dispatch(createPastePresetsAction(presets, target, deleteAfterPaste));
            },
            updateScreen: (state: ScreenState): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(PastePage);