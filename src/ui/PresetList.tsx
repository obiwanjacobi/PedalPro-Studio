import * as React from "react";
import { Collapse, Grid, Paper, Checkbox, Tooltip, IconButton } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import Typography from "material-ui/Typography/Typography";
import { ExpandMore, ExpandLess, Save, Undo, ArrowUpward, ArrowDownward } from "material-ui-icons";
import { isNullOrUndefined } from "util";

import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListProps {
    presets: Preset[];
    filter: string;
}
export type PresetListActions = SelectPresets & EditPreset & MovePreset;
export interface PresetListState {
    expanded: boolean[];
    names: string[];
}

export type PresetListAllProps = PresetListProps & PresetListActions;

const styles = {
    smallIcon: {
      width: 20,
      height: 20,
    },
    hidden: {
        display: "none"
    }
};

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
            <Grid 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                xl={2} 
                item={true} 
                key={index} 
                style={!this.isVisible(preset) ? styles.hidden : {}}
            >
                <Paper elevation={2}>
                    <Grid container={true} alignItems="center" spacing={8}>
                        <Grid xs={2} item={true}>
                            <Tooltip title="Current Preset index. Click to select Preset." placement="top">
                                <Checkbox 
                                    checked={this.props.presets[index].selected} 
                                    onClick={() => this.toggleSelected(index)}
                                    icon={this.formatIndex(preset)}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid xs={8} item={true}>
                            <Typography type="subheading">{preset.name}</Typography>
                        </Grid>
                        <Grid xs={1} item={true}>
                            <Tooltip title="Click to expand." placement="left">
                                <IconButton onClick={() => this.toggleExpanded(index)} >
                                    {this.state.expanded[index] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Collapse in={this.state.expanded[index]}>
                        <Grid container={true} justify="flex-end">
                            <Grid item={true} xs={8}>
                                <Input
                                    placeholder="Preset Name"
                                    margin="dense"
                                    value={this.state.names[index]}
                                    onChange={(e) => this.updateName(e.target.value, index)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Tooltip 
                                                title="Click to revert to the original text" 
                                                placement="left"
                                            >
                                                <IconButton 
                                                    disabled={!this.canUndo(preset, index)}
                                                    onClick={() => this.undoName(preset, index)}
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
                                        disabled={!this.canMoveUp(preset)}
                                        onClick={() => this.movePreset(preset, -1)}
                                    >
                                        <ArrowUpward style={styles.smallIcon}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Click to move this Preset down in the list" placement="left">
                                    <IconButton 
                                        style={styles.smallIcon}
                                        disabled={!this.canMoveDown(preset)}
                                        onClick={() => this.movePreset(preset, 1)}
                                    >
                                        <ArrowDownward style={styles.smallIcon}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item={true} xs={2}>
                                <Tooltip title="Click to keep the changes." placement="right">
                                    <IconButton 
                                        color="secondary"
                                        disabled={!this.canSave(preset, index)}
                                        onClick={() => this.save(preset, index)}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item={true} xs={12} />
                        </Grid>         
                    </Collapse>
                </Paper>
            </Grid>
        );
    }

    private formatIndex(preset: Preset): string {
        const index = preset.index;
        return (String(0).repeat(3) + String(index)).slice(String(index).length);
    }

    private canMoveUp(preset: Preset): boolean {
        return preset.index > 0;
    }

    private canMoveDown(preset: Preset): boolean {
        return preset.index < this.props.presets.length - 1;
    }

    private movePreset(preset: Preset, displacement: number) {
        const index = this.props.presets.indexOf(preset);
        const targetIndex = index + displacement;
    
        this.props.movePreset(preset, displacement);
        this.swapState(index, targetIndex);
    }

    private swapState(index1: number, index2: number) {
        const newState = { expanded: this.state.expanded.slice(), names: this.state.names.slice() };
        // swap expanded
        const expanded = newState.expanded[index1];
        newState.expanded[index1] = newState.expanded[index2];
        newState.expanded[index2] = expanded;
        // swap names
        const name = newState.names[index1];
        newState.names[index1] = newState.names[index2];
        newState.names[index2] = name;
        
        this.setState(newState);
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
        if (name.length > 10) { return; }
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
        const expanded = !this.state.expanded[index];
        newExpanded[index] = expanded;
        this.setState({ expanded: newExpanded, names: this.state.names });
    }

    private toggleSelected(index: number) {
        const preset = this.props.presets[index];
        const selected = !preset.selected;
        this.props.selectPresets([preset], selected);
    }

    private isVisible(preset: Preset): boolean {
        if (!this.props.filter || this.props.filter.length === 0) {
            return true;
        }

        return preset.name.toUpperCase().search(this.props.filter.toUpperCase()) >= 0;
    }
}