import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    FormControl, FormControlLabel, RadioGroup, Radio, Select,
    Grid, IconButton, Dialog, Typography, Button, MenuItem, InputLabel, Input
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../preset/Preset";
import { ItemUI } from "../ItemUI";
import { PresetArrayBuilder } from "../preset/PresetBuilder";
import { MovePresets, createMovePresetsAction } from "../preset/MovePresetsAction";
import { presetHasChanged, formatPresetFullName } from "../preset/PresetOperations";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../preset/PastePresetsAction";
import { PresetChangedFlag } from "../preset/PresetChangedFlag";
import { SourcePresetList } from "../preset/SourcePresetList";
import { PreviewList } from "../preset/PreviewList";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { SelectedView } from "../controls/SelectedView";
import { Title } from "../controls/Title";
import { ScreenState } from "../screen/ScreenState";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";

enum MoveType {
    None = "none",
    Insert = "insert",
    Swap = "swap",
}

const Styles = {
    MainColumn: { padding: "8px" }
};

export interface DeviceMovePageProps { }
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

export class DeviceMovePage extends React.Component<DeviceMovePageAllProps, DeviceMovePageState> {
    private selection: SelectedView<Preset>;

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
                    <Title caption="Move Presets" sub="DEVICE" />
                    <Button onClick={this.moveAndClose} disabled={!this.hasResult}>
                        Move
                    </Button>
                </ApplicationToolbar>
                <Grid container={true} style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
                    <Grid item={true} xs={4} container={true} direction="column" style={Styles.MainColumn}>
                        <Typography variant="body2">Selected</Typography>
                        <SourcePresetList items={this.selection.selected} />
                    </Grid>

                    <Grid item={true} xs={4} style={Styles.MainColumn}>
                        <Typography variant="body2">Operation</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup value={this.state.moveType} onChange={this.onMoveTypeChange}>
                                <FormControlLabel value={MoveType.Insert} label="Insert (before)" control={<Radio />} />
                                <FormControlLabel value={MoveType.Swap} label="Swap / Exchange" control={<Radio />} />
                                <FormControl>
                                    <InputLabel htmlFor="target-input">Target</InputLabel>
                                    <Select
                                        value={this.state.targetIndex}
                                        onChange={this.onTargetIndexChange}
                                        input={<Input id="target-input" />}
                                    >
                                        {this.renderTargetList()}
                                    </Select>
                                </FormControl>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item={true} xs={4} container={true} direction="column" style={Styles.MainColumn}>
                        <Typography variant="body2">Moved preview</Typography>
                        <PreviewList items={this.movedPresets()} />
                    </Grid>
                </Grid>
            </Dialog>
        );
    }

    private renderTargetList() {
        return this.props.presets
            .filter(p => !p.ui.selected)
            .map((p, i) =>
                <MenuItem key={i} value={p.index}>{formatPresetFullName(p)}<PresetChangedFlag preset={p} /></MenuItem>);
    }

    private get hasResult(): boolean {
        return this.movedPresets().length > 0;
    }

    private onTargetIndexChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ targetIndex: Number(event.target.value) });
    }

    private onMoveTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ moveType: event.target.value });
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

const extractComponentPropsFromState = (state: ApplicationDocument): DeviceMovePageStateProps => {
    return { presets: state.device, open: state.screen.moveOpen };
};

const createActionObject = (dispatch: Dispatch): DeviceMovePageActions => {
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