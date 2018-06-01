import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControl, FormControlLabel, RadioGroup, Radio, 
    Grid, IconButton, List, Dialog, Typography, Button, Checkbox 
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
import { OverwrittenListItem, NotFoundPreset } from "./OverwrittenListItem";
import { SelectedView } from "../controls/SelectedView";
import { SourcePresetListItem } from "./SourcePresetListItem";

enum MoveType {
    None = "none",
    Insert = "insert",
    Swap = "swap",
    Empty = "empty"
}

export interface DeviceMovePageProps {}
export interface DeviceMovePageState {
    moveType: string;
    reorder: boolean;
}
export interface DeviceMovePageStateProps {
    open: boolean;
    presets: Preset[];
}
export type DeviceMovePageActions = ChangePresets & PastePresets & UpdateScreen;
export type DeviceMovePageAllProps = DeviceMovePageProps & DeviceMovePageStateProps & DeviceMovePageActions;

export class DeviceMovePage extends React.Component<DeviceMovePageAllProps, DeviceMovePageState> {
    private selection: SelectedView;

    public constructor(props: DeviceMovePageAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.state = { moveType: MoveType.None, reorder: true };

        this.close = this.close.bind(this);
        this.onMoveTypeChange = this.onMoveTypeChange.bind(this);
        this.move = this.move.bind(this);
    }

    public componentWillReceiveProps(newProps: DeviceMovePageAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    public render() {
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    <Typography variant="subheading" style={{flex: 1}}>DEVICE</Typography>
                    <Typography variant="title" style={{flex: 1}}>Move Presets</Typography>
                    <Button onClick={this.move} disabled={this.hasResult}>
                        Move
                    </Button>
                </ApplicationToolbar>
                <div style={{padding: 12}}>
                    <Grid container={true} spacing={8}>
                    <Grid item={true} xs={4}>
                            <Typography variant="body2">Selected</Typography>
                            <List id="SelectedList">
                                {this.selection.selected.map((preset: Preset, index: number) => {
                                    return (
                                        <SourcePresetListItem
                                            key={index} 
                                            preset={preset} 
                                        />
                                    );
                                })}
                            </List>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Operation</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup value={this.state.moveType} onChange={this.onMoveTypeChange}>
                        <FormControlLabel value={MoveType.Insert} label="Insert (before)" control={<Radio/>} />
                        <FormControlLabel value={MoveType.Swap} label="Swap / Exchange" control={<Radio/>} />
                        <FormControlLabel value={MoveType.Empty} label="Move to empty" control={<Radio/>} />}
                                </RadioGroup>
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox 
                                    checked={this.state.reorder} 
                                    onChange={this.onReorderChange}
                                />}
                                label="Reorder"
                            />
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
    
    private onReorderChange() {
        this.modifyState({reorder: !this.state.reorder});
    }

    private onMoveTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.modifyState({moveType: event.target.value});
    }

    private modifyState(state: Partial<DeviceMovePageState>) {
        this.setState({ ...this.state, ...state });
    }

    private overwrittenPresets(): Preset[] {
        switch (this.state.moveType) {
            case MoveType.Empty:
            case MoveType.Insert:
            case MoveType.Swap:
            default:
                return [];
        }
    }

    private close() {
        this.props.updateScreen({ moveOpen: false });
    }

    private move() {
        this.close();
    }
}

type ExtractStatePropFunc = MapStateToProps<DeviceMovePageStateProps, DeviceMovePageProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = 
    (state: ApplicationDocument, _: DeviceMovePageProps): DeviceMovePageStateProps => {
        return  { presets: state.device, open: state.screen.moveOpen };
};

const createActionObject: MapDispatchToPropsFunction<DeviceMovePageActions, DeviceMovePageProps> =
    (dispatch: Dispatch, _: DeviceMovePageProps): DeviceMovePageActions => {
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

export default connect(extractComponentPropsFromState, createActionObject)(DeviceMovePage);