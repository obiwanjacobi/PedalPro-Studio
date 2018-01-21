import * as React from "react";
import { Grid, Tooltip, IconButton } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import { Save, Undo, ArrowUpward, ArrowDownward } from "material-ui-icons";
import { isNullOrUndefined } from "util";

import Preset from "../client/Preset";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListItemDetailProps { 
    preset: Preset;
}
export type PresetListItemDetailActions = EditPreset; // & MovePreset;
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
        this.state = { name: "" };
        // bind event handlers
        this.updateName = this.updateName.bind(this);
    }

    public shouldComponentUpdate(
        nextProps: PresetListItemDetailAllProps, nextState: PresetListItemDetailState): boolean {
        return (
            this.props.preset !== nextProps.preset 
        )
            || 
        (
            this.state.name !== nextState.name
        );
    }

    public render(): React.ReactNode {
        // console.log("Render: Preset: " + this.props.preset.index);

        return (
            <Grid container={true} justify="flex-end">
                <Grid item={true} xs={8}>
                    <Input
                        placeholder="Preset Name"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.updateName/*(e.target.value)*/}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip 
                                    title="Click to revert to the original text" 
                                    placement="left"
                                >
                                    <IconButton 
                                        // disabled={!this.canUndo(preset, index)}
                                        // onClick={() => this.undoName(preset, index)}
                                    >
                                        <Undo />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid xs={1} item={true}>
                    <Tooltip title="Click to move this Preset up in the list" placement="left">
                        <IconButton 
                            style={styles.smallIcon}
                            // disabled={!this.canMoveUp(preset)}
                            // onClick={() => this.movePreset(preset, -1)}
                        >
                            <ArrowUpward style={styles.smallIcon}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Click to move this Preset down in the list" placement="left">
                        <IconButton 
                            style={styles.smallIcon}
                            // disabled={!this.canMoveDown(preset)}
                            // onClick={() => this.movePreset(preset, 1)}
                        >
                            <ArrowDownward style={styles.smallIcon}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item={true} xs={2}>
                    <Tooltip title="Click to keep the changes." placement="right">
                        <IconButton 
                            color="accent"
                            // disabled={!this.canSave(preset, index)}
                            // onClick={() => this.save(preset, index)}
                        >
                            <Save />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item={true} xs={12} />
            </Grid>         
        );
    }

    // private canMoveUp(preset: Preset): boolean {
    //     return preset.index > 0;
    // }

    // private canMoveDown(preset: Preset): boolean {
    //     return preset.index < this.props.presets.length - 1;
    // }

    // private movePreset(preset: Preset, displacement: number) {
    //     const index = this.props.presets.indexOf(preset);
    //     const targetIndex = index + displacement;
    
    //     this.props.movePreset(preset, displacement);
    // }

    // private canSave(preset: Preset, index: number): boolean {
    //     return this.state && 
    //         this.state.names &&
    //         !isNullOrUndefined(this.state.names[index]) &&
    //         this.state.names[index].length > 0 &&
    //         this.state.names[index] !== preset.name;
    // }

    // private canUndo(preset: Preset, index: number): boolean {
    //     return (
    //         this.state && 
    //         this.state.names &&
    //         !isNullOrUndefined(this.state.names[index]) &&
    //         this.state.names[index] !== preset.name)
            
    //         ||

    //         this.state.names[index] !== preset.history.name;
    // }

    // private updateName(name: string) {
    private updateName(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        if (name.length > 10) { return; }
        this.setState({ name: name });
    }

    // private undoName(preset: Preset, index: number) {
    //     this.updateName(preset.history.name, index);
    // }

    // private save(preset: Preset, index: number) {
    //     this.props.editPreset(preset, { name: this.state.names[index] });
    // }
}