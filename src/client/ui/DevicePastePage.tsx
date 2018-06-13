import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControl, FormControlLabel, RadioGroup, Radio, 
    Grid, IconButton, List, Checkbox, Dialog, Typography, Button, Paper 
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { ScreenState } from "../screen/ScreenState";
import { SelectedView } from "../controls/SelectedView";
import { PreviewListItem, NotFoundPreset } from "./PreviewListItem";
import { SourcePresetListItem } from "./SourcePresetListItem";
import { Title } from "../controls/Title";

enum PasteType {
    None = "none",
    Index = "index",
    Name = "name",
    Empty = "empty"
}

export interface DevicePastePageProps {}
export interface DevicePastePageState {
    pasteType: string;
    removeSelected: boolean;
}
export interface DevicePastePageStateProps {
    open: boolean;
    clipboard: Preset[];
    presets: Preset[];
}
export type DevicePastePageActions = ChangePresets & PastePresets & UpdateScreen;
export type DevicePastePageAllProps = DevicePastePageProps & DevicePastePageStateProps & DevicePastePageActions;

const style = {
    padding: 12
};

export class DevicePastePage extends React.Component<DevicePastePageAllProps, DevicePastePageState> {
    private selection: SelectedView;

    public constructor(props: DevicePastePageAllProps) {
        super(props);
        this.selection = new SelectedView(props.clipboard);
        
        this.state = { pasteType: PasteType.None, removeSelected: true };
        this.close = this.close.bind(this);
        this.onPasteTypeChange = this.onPasteTypeChange.bind(this);
        this.onRemoveSelectedChange = this.onRemoveSelectedChange.bind(this);
        this.overwrite = this.overwrite.bind(this);
    }

    public componentWillReceiveProps(newProps: DevicePastePageAllProps) {
        this.selection = new SelectedView(newProps.clipboard);
    }

    public render() {
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    <Title caption="Paste Presets" prelude="DEVICE - " />
                    <Button onClick={this.overwrite} disabled={this.hasResult}>
                        Overwrite
                    </Button>
                </ApplicationToolbar>
                <div style={style}>
                    <Grid container={true} spacing={8}>
                        <Grid item={true} xs={4}>
                            <Paper elevation={2} style={style}>
                                <Typography variant="body2">Clipboard</Typography>
                                <List id="ClipboardList">
                                    {this.props.clipboard.map((preset: Preset, index: number) => {
                                        return (
                                            <SourcePresetListItem
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
                            </Paper>
                        </Grid>
                        
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Operation</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup value={this.state.pasteType} onChange={this.onPasteTypeChange}>
                        <FormControlLabel value={PasteType.Index} label="Replace by Index" control={<Radio/>} />
                        <FormControlLabel value={PasteType.Name} label="Replace by Name" control={<Radio/>} />
                        <FormControlLabel value={PasteType.Empty} label="Replace empty" control={<Radio/>} />}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Paper elevation={2} style={style}>
                                <Typography variant="body2">Overwritten</Typography>
                                <List id="DeviceList">
                                    {this.overwrittenPresets().map((preset: Preset, index: number) => {
                                        return (
                                            <PreviewListItem
                                                key={index} 
                                                preset={preset}
                                                match={false}
                                            />
                                        );
                                    })}
                                </List>
                            </Paper>
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
        this.setState({removeSelected: !this.state.removeSelected});
    }
    
    private onPasteTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({pasteType: event.target.value});
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
        this.props.pastePresets(this.pastedPresets(), PresetCollectionType.device, this.state.removeSelected);
        this.close();
    }
}

const extractComponentPropsFromState: MapStateToProps<
        DevicePastePageStateProps, DevicePastePageProps, ApplicationDocument
    > = (state: ApplicationDocument, _: DevicePastePageProps): DevicePastePageStateProps => {
        return  { presets: state.device, clipboard: state.clipboard, open: state.screen.pasteOpen };
};

const createActionObject: MapDispatchToPropsFunction<DevicePastePageActions, DevicePastePageProps> =
    (dispatch: Dispatch, _: DevicePastePageProps): DevicePastePageActions => {
        return {
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
            },
            pastePresets: (presets: Preset[], target: PresetCollectionType, deleteAfterPaste: boolean): void => {
                dispatch(createPastePresetsAction(presets, target, deleteAfterPaste));
            },
            updateScreen: (state: Partial<ScreenState>): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(DevicePastePage);