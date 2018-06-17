import * as React from "react";
import { Grid, IconButton, Input, InputAdornment } from "@material-ui/core";
import { Delete, Save, Undo, ArrowUpward, ArrowDownward } from "@material-ui/icons";

import { Preset } from "../preset/Preset";
import { EditPreset } from "../preset/EditPresetAction";
import { MovePresets } from "../preset/MovePresetsAction";
import { DeletePresets } from "../preset/DeletePresetsAction";

export interface PresetListItemDetailProps { 
    preset: Preset;
    maxPresetCount: number;
}
export type PresetListItemDetailActions = EditPreset & MovePresets & DeletePresets;
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

export class PresetListItemDetail extends 
    React.Component<PresetListItemDetailAllProps, PresetListItemDetailState> {

    constructor(props: PresetListItemDetailAllProps) {
        super(props);
        this.state = { name: props.preset.name };
        // bind event handlers
        this.updateNameHandler = this.updateNameHandler.bind(this);
        this.undoName = this.undoName.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
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
                <Grid item={true} xs={1}/>
                <Grid item={true} xs={6}>
                    <Input
                        style={{width: 150}}
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
                <Grid item={true} xs={3}>
                    <div style={{width: 100}}>
                        <IconButton 
                            color="secondary"
                            disabled={!this.canSave}
                            onClick={this.save}
                        >
                            <Save />
                        </IconButton>
                        <IconButton 
                            disabled={!this.canDelete}
                            onClick={this.delete}
                        >
                            <Delete />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item={true} xs={1}>
                    <div style={{width: 30}}>
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
                    </div>
                </Grid>
                <Grid item={true} xs={1} />
                <Grid item={true} xs={12} />
            </Grid>         
        );
    }

    private get canMoveUp(): boolean {
        return this.props.preset.index > 0;
    }

    private movePresetUp() {
        this.props.movePresets([this.props.preset], this.props.preset.index - 1);
    }

    private movePresetDown() {
        // 'insert before' requires one extra => that is why +2 and not +1
        this.props.movePresets([this.props.preset], this.props.preset.index + 2);
    }

    private get canMoveDown(): boolean {
        return this.props.preset.index < this.props.maxPresetCount - 1;
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

    private get canDelete(): boolean {
        return !this.props.preset.traits.empty;
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

    private delete() {
        // TODO: confirm
        this.props.deletePresets(this.props.preset.source, [this.props.preset]);
    }
}