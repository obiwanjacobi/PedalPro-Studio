import * as React from "react";
import { Grid, IconButton } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import { Save, Undo, ArrowUpward, ArrowDownward } from "material-ui-icons";

import Preset from "../client/Preset";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListItemDetailProps { 
    preset: Preset;
}
export type PresetListItemDetailActions = EditPreset & MovePreset;
export interface PresetListItemDetailState {
    name: string;
}

export type PresetListItemDetailAllProps = PresetListItemDetailProps & PresetListItemDetailActions;

const styles = {
    smallIcon: {
      width: 20,
      height: 20,
    }
};

export default class PresetListItemDetail extends 
    React.Component<PresetListItemDetailAllProps, PresetListItemDetailState> {

    constructor(props: PresetListItemDetailAllProps) {
        super(props);
        this.state = { name: props.preset.name };
        // bind event handlers
        this.updateNameHandler = this.updateNameHandler.bind(this);
        this.undoName = this.undoName.bind(this);
        this.save = this.save.bind(this);
        this.movePresetUp = this.movePresetUp.bind(this);
        this.movePresetDown = this.movePresetDown.bind(this);
    }

    public shouldComponentUpdate(
        nextProps: PresetListItemDetailAllProps, nextState: PresetListItemDetailState): boolean {
        return this.props.preset !== nextProps.preset || 
            this.state.name !== nextState.name;
    }

    public componentWillReceiveProps(
        nextProps: PresetListItemDetailAllProps, _: PresetListItemDetailState) {
        this.setState({ name: nextProps.preset.name });
    }

    public render(): React.ReactNode {
        return (
            <Grid container={true} justify="flex-end">
                <Grid item={true} xs={8}>
                    <Input
                        placeholder="Preset Name"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.updateNameHandler}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton 
                                    disabled={!this.canUndo}
                                    onClick={this.undoName}
                                >
                                    <Undo />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid xs={1} item={true}>
                    <IconButton 
                        style={styles.smallIcon}
                        disabled={!this.canMoveUp}
                        onClick={this.movePresetUp}
                    >
                        <ArrowUpward style={styles.smallIcon}/>
                    </IconButton>
                    <IconButton 
                        style={styles.smallIcon}
                        disabled={!this.canMoveDown}
                        onClick={this.movePresetDown}
                    >
                        <ArrowDownward style={styles.smallIcon}/>
                    </IconButton>
                </Grid>
                <Grid item={true} xs={2}>
                    <IconButton 
                        color="secondary"
                        disabled={!this.canSave}
                        onClick={this.save}
                    >
                        <Save />
                    </IconButton>
                </Grid>
                <Grid item={true} xs={12} />
            </Grid>         
        );
    }

    private get canMoveUp(): boolean {
        return this.props.preset.index > 0;
    }

    private movePresetUp() {
        this.props.movePreset(this.props.preset, -1);
    }

    private movePresetDown() {
        this.props.movePreset(this.props.preset, 1);
    }

    private get canMoveDown(): boolean {
        // TODO: use actual number of presets!
        return this.props.preset.index < 400;
    }

    private get canSave(): boolean {
        return this.state && 
            this.state.name.length > 0 &&
            this.state.name !== this.props.preset.name;
    }

    private get canUndo(): boolean {
        if (!this.state) { return false; }

        return this.state.name !== this.props.preset.name ||
            this.state.name !== this.props.preset.origin.name;
    }

    private updateNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.updateName(e.target.value);
    }

    private updateName(name: string) {
        if (name.length > 10) { return; }
        this.setState({ name: name });
    }

    private undoName() {
        this.updateName(this.props.preset.origin.name);
    }

    private save() {
        this.props.editPreset(this.props.preset, { name: this.state.name });
    }
}