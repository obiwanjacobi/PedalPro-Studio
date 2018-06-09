import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControl, FormControlLabel, RadioGroup, Radio, Select,
    Grid, IconButton, List, Dialog, Typography, Button, Paper, MenuItem, InputLabel, Input 
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import { presetHasChanged, formatPresetFullName } from "../PresetOperations";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { ScreenState } from "../screen/ScreenState";
import { OverwrittenListItem } from "./OverwrittenListItem";
import { SelectedView } from "../controls/SelectedView";
import { SourcePresetListItem } from "./SourcePresetListItem";
import { PresetArrayBuilder } from "../PresetBuilder";
import { MovePresets, createMovePresetsAction } from "../MovePresetsAction";
import { FlexContainer } from "../controls/FlexContainer";

enum MoveType {
    None = "none",
    Insert = "insert",
    Swap = "swap",
}

export interface DeviceMovePageProps {}
export interface DeviceMovePageState {
    moveType: string;
    targetIndex: number;
}
export interface DeviceMovePageStateProps {
    open: boolean;
    presets: Preset[];
}
export type DeviceMovePageActions = ChangePresets & PastePresets & UpdateScreen & MovePresets;
export type DeviceMovePageAllProps = DeviceMovePageProps & DeviceMovePageStateProps & DeviceMovePageActions;

const style = {
    padding: 12,
    height: "100%"
};

export class DeviceMovePage extends React.Component<DeviceMovePageAllProps, DeviceMovePageState> {
    private selection: SelectedView;

    public constructor(props: DeviceMovePageAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.state = { targetIndex: -1, moveType: MoveType.None };

        this.close = this.close.bind(this);
        this.onMoveTypeChange = this.onMoveTypeChange.bind(this);
        this.onTargetIndexChange = this.onTargetIndexChange.bind(this);
        this.moveAndClose = this.moveAndClose.bind(this);
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
                    <div style={{margin: "0 auto"}}>
                        <Typography variant="subheading" style={{flex: 1}}>DEVICE - </Typography>
                        <Typography variant="title" style={{flex: 1}}>Move Presets</Typography>
                    </div>
                    <Button onClick={this.moveAndClose} disabled={!this.hasResult}>
                        Move
                    </Button>
                </ApplicationToolbar>
                <div style={style}>
                    <Grid container={true} spacing={8}>
                        <Grid item={true} xs={4}>
                            <Paper elevation={2} style={style}>
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
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={1} />
                        <Grid item={true} xs={3}>
                            <Typography variant="body2">Operation</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup value={this.state.moveType} onChange={this.onMoveTypeChange}>
                        <FormControlLabel value={MoveType.Insert} label="Insert (before)" control={<Radio/>} />
                        <FormControlLabel value={MoveType.Swap} label="Swap / Exchange" control={<Radio/>} />
                        <FormControl>
                            <InputLabel htmlFor="target-input">Target</InputLabel>
                            <Select 
                                value={this.state.targetIndex}
                                onChange={this.onTargetIndexChange}
                                input={<Input id="target-input"/>}
                            >
                                {this.renderTargetList()}
                            </Select>
                        </FormControl>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <Paper elevation={2} style={style}>
                                <Typography variant="body2">Moved preview</Typography>
                                <FlexContainer vertical={true}>
                                    <List id="DeviceList">
                                        {this.movedPresets().map((preset: Preset, index: number) => {
                                            return (
                                                <OverwrittenListItem
                                                    key={index} 
                                                    preset={preset}
                                                    match={this.isMatch(preset)}
                                                />
                                            );
                                        })}
                                    </List>
                                </FlexContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        );
    }

    private renderTargetList() {
        return this.props.presets
            .filter(p => !this.isMatch(p))
            .map((p, i) => 
                <MenuItem key={i} value={p.index}>{formatPresetFullName(p)}</MenuItem>);
    }

    private get hasResult(): boolean {
        return this.movedPresets().length > 0;
    }
    
    private onTargetIndexChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({targetIndex: Number(event.target.value)});
    }

    private onMoveTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({moveType: event.target.value});
    }

    private isMatch(preset: Preset): boolean {
        return preset.ui.selected;
    }

    private movedPresets(): Preset[] {
        switch (this.state.moveType) {
            case MoveType.Insert:
            return this.movedPresetsInsert();

            case MoveType.Swap:
            return this.movedPresetsSwap();
            
            default:
                return [];
        }
    }

    private movedPresetsInsert(): Preset[] {
        if (this.state.targetIndex === -1) { return []; }

        const builder = new PresetArrayBuilder(this.props.presets);
        builder.acceptChanges();
        builder.movePresets(this.selection.selected, this.state.targetIndex);
        return builder.detach().filter(p => presetHasChanged(p) || p.ui.selected);
    }

    private movedPresetsSwap(): Preset[] {
        if (this.state.targetIndex === -1) { return []; }

        const builder = new PresetArrayBuilder(this.props.presets);
        builder.acceptChanges();
        builder.swapPresets(this.selection.selected, this.state.targetIndex);
        return builder.detach().filter(p => presetHasChanged(p) || p.ui.selected);
    }

    private close() {
        this.props.updateScreen({ moveOpen: false });
    }

    private move() {
        switch (this.state.moveType) {            
            case MoveType.Insert:
            this.props.movePresets(this.selection.selected, this.state.targetIndex);
            break;
            
            case MoveType.Swap:
            this.props.movePresets(this.selection.selected, this.state.targetIndex, true);
            break;
            
            default:
            break;
        }
    }

    private moveAndClose() {
        this.move();
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
            },
            movePresets: (presets: Preset[], targetIndex: number, swap?: boolean): void => {
                dispatch(createMovePresetsAction(presets, targetIndex, swap));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(DeviceMovePage);