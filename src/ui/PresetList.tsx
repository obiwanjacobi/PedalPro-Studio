import * as React from "react";
import { Collapse, Grid, Paper, Checkbox } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import IconButton from "material-ui/IconButton/IconButton";
import Typography from "material-ui/Typography/Typography";
import { ExpandMore, ExpandLess, Save, Undo } from "material-ui-icons";

import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { isNullOrUndefined } from "util";

export interface PresetListProps {
    presets: Preset[];
}
export type PresetListActions = SelectPresets & EditPreset;
export interface PresetListState {
    expanded: boolean[];
    names: string[];
}

export type PresetListAllProps = PresetListProps & PresetListActions;

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div />; }

        return ( 
            <Grid container={true}>
                    {this.props.presets.map(
                        (preset: Preset, index: number) => this.presetSummary(preset, index)
                    )}
            </Grid>
        );
    }

    public componentWillReceiveProps(newProps: PresetListAllProps) {
        if (!this.state) {
            var names = new Array<string>(newProps.presets.length);
            newProps.presets.map((preset: Preset, index: number) => names[index] = preset.name);
            
            this.setState({ 
                expanded: new Array<boolean>(newProps.presets.length),
                names: names
            });
        }
    }

    private presetSummary(preset: Preset, index: number): React.ReactNode {
        return (
            <Grid xs={12} sm={6} md={4} lg={3} xl={2} item={true} key={index}>
                <Paper elevation={2}>
                    <Grid container={true} alignItems="center" spacing={8}>
                        <Grid xs={2} item={true}>
                            <Checkbox 
                                checked={this.props.presets[index].selected} 
                                onClick={() => this.toggleSelected(index)}
                            />
                        </Grid>
                        <Grid xs={8} item={true}>
                            <Typography>{preset.name}</Typography>
                        </Grid>
                        <Grid xs={1} item={true}>
                            <IconButton onClick={() => this.toggleExpanded(index)} >
                                {this.state.expanded[index] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Grid>
                        
                    </Grid>
                    <Collapse in={this.state.expanded[index]}>
                        <Grid container={true} justify="flex-end">
                            <Grid item={true} xs={9}>
                                <Input
                                    value={this.state.names[index]}
                                    onChange={(e) => this.updateName(e.target.value, index)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton 
                                                disabled={!this.canUndo(preset, index)}
                                                onClick={() => this.undoName(preset, index)}
                                            >
                                                <Undo />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Grid>
                            <Grid item={true} xs={2}>
                                <IconButton 
                                    disabled={!this.canSave(preset, index)}
                                    onClick={() => this.save(preset, index)}
                                >
                                    <Save />
                                </IconButton>
                            </Grid>
                            <Grid item={true} xs={12} />
                        </Grid>         
                    </Collapse>
                </Paper>
            </Grid>
        );
    }

    private canSave(preset: Preset, index: number): boolean {
        return this.state && 
            this.state.names &&
            !isNullOrUndefined(this.state.names[index]) &&
            this.state.names[index].length > 0 &&
            this.state.names[index] !== preset.name;
    }

    private canUndo(preset: Preset, index: number): boolean {
        return (
            this.state && 
            this.state.names &&
            !isNullOrUndefined(this.state.names[index]) &&
            this.state.names[index] !== preset.name)
            
            ||

            this.state.names[index] !== preset.history.name;
    }

    private updateName(name: string, index: number) {
        const newNames = this.state.names.slice();
        newNames[index] = name;
        this.setState({ names: newNames, expanded: this.state.expanded });
    }
    private undoName(preset: Preset, index: number) {
        this.updateName(preset.history.name, index);
    }

    private save(preset: Preset, index: number) {
        this.props.editPreset(preset, { name: this.state.names[index] });
    }

    private toggleExpanded(index: number) {
        const newExpanded = this.state.expanded.slice();
        newExpanded[index] = !this.state.expanded[index];
        this.setState({ expanded: newExpanded, names: this.state.names });
    }

    private toggleSelected(index: number) {
        const preset = this.props.presets[index];
        const selected = !preset.selected;
        this.props.selectPresets([preset], selected);
    }
}