import * as React from "react";
import { Collapse, Grid, Paper, Checkbox } from "material-ui";
// import List from "material-ui/List/List";
// import ListItem from "material-ui/List/ListItem";
// import ListItemText from "material-ui/List/ListItemText";
// import ListItemSecondaryAction from "material-ui/List/ListItemSecondaryAction";
import Input, { InputAdornment } from "material-ui/Input";
// import ExpansionPanel from "material-ui/ExpansionPanel/ExpansionPanel";
// import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
// import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";
// import ExpansionPanelActions from "material-ui/ExpansionPanel/ExpansionPanelActions";
import IconButton from "material-ui/IconButton/IconButton";
import Typography from "material-ui/Typography/Typography";
// import TextField from "material-ui/TextField/TextField";
import { ExpandMore, ExpandLess, Unarchive, Close } from "material-ui-icons";

import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { isNullOrUndefined } from "util";

export interface PresetListProps {
    presets: Preset[];
}
export type PresetListActions = SelectPresets;
export interface PresetListState {
    expanded: boolean[];
 }

export type PresetListAllProps = PresetListProps & PresetListActions;

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    // private dense: boolean = true;

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div />; }

        return ( 
            <Grid container={true} >
                    {this.props.presets.map(
                        (preset: Preset, index: number) => {
                            return this.presetSummary(index, preset);
                        }
                    )}
            </Grid>
        );
    }

    public componentWillReceiveProps(newProps: PresetListAllProps) {
        if (isNullOrUndefined(this.state) || 
            isNullOrUndefined(this.state.expanded) || 
            this.state.expanded.length === 0) {
            this.setState({ expanded: new Array<boolean>(newProps.presets.length) });
        }
    }

    private presetSummary(index: number, preset: Preset): React.ReactNode {
        return (
            <Grid xs={12} sm={6} md={4} lg={3} item={true} key={index}>
                <Paper elevation={4}>
                    <Grid container={true} alignItems="center">
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
                        <Input
                            id={preset.name + index} 
                            defaultValue={preset.name}
                            onChange={() => this.renamePreset(preset)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={() => this.renamePreset(preset, preset.history.name)}>
                                        <Close />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <div>
                            <IconButton onClick={() => this.renamePreset(preset, preset.history.name)}>
                                <Unarchive />
                            </IconButton>
                        </div>
                    </Collapse>
                </Paper>
            </Grid>
        );
    }

    // private expansionpannel_presetSummary(index: number, preset: Preset): React.ReactNode {
    //     return (
    //         <ExpansionPanel key={index}>
    //             <ExpansionPanelSummary>
    //                 <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.presets[index].selected} />
    //                 <Typography>{preset.name}</Typography>
    //             </ExpansionPanelSummary>
    //             <ExpansionPanelDetails>
    //                 <Input
    //                     id={preset.name + index} 
    //                     // value={preset.name}
    //                     onChange={() => this.renamePreset(preset)}
    //                     endAdornment={
    //                         <InputAdornment position="end">
    //                             <IconButton
    //                                 onClick={() => this.renamePreset(preset, preset.history.name)}
    //                                 onMouseDown={(e) => e.preventDefault()}
    //                             >
    //                                 <Close />
    //                             </IconButton>
    //                         </InputAdornment>
    //                     }
    //                 />
    //                 <Typography color="secondary">
    //                     {preset.history.collection + ": " + preset.history.name + " (" + preset.history.index + ")"}
    //                 </Typography>
    //             </ExpansionPanelDetails>
    //             <ExpansionPanelActions>
    //                 <IconButton
    //                     onClick={() => this.renamePreset(preset, preset.history.name)}
    //                     onMouseDown={(e) => e.preventDefault()}
    //                 >
    //                     <Unarchive />
    //                 </IconButton>
    //             </ExpansionPanelActions>
    //         </ExpansionPanel>
    //     );
    // }

    // private __presetSummary(index: number, preset: Preset): React.ReactNode {
    //     return (
    //         <Button 
    //             key={"s" + index} 
    //             // button={true} 
    //             dense={this.dense} 
    //             // disableGutters={this.dense} 
    //             onClick={() => this.toggleSelected(index)}
    //         >
    //             <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.presets[index].selected} />
    //             <ListItemText primary={preset.name} secondary={preset.index} />
                
    //             <ListItemSecondaryAction>
    //                 <IconButton onClick={() => this.toggleExpanded(index)} >
    //                     {this.state.expanded[index] ? <ExpandLess /> : <ExpandMore />}
    //                 </IconButton>
    //             </ListItemSecondaryAction>
    //         </Button>
    //     );
    // }

    // private presetDetails(index: number, preset: Preset): React.ReactNode {
    //     return (
    //         <Collapse 
    //             component="li"
    //             key={"d" + index} 
    //             in={this.state.expanded[index]}
    //         >
    //                 <TextField
    //                     id={preset.name + index} 
    //                     value={preset.name}
    //                     onChange={() => this.renamePreset(preset)}
    //                     // endAdornment={
    //                     //     <InputAdornment position="end">
    //                     //         <IconButton
    //                     //             onClick={() => this.renamePreset(preset, preset.history.name)}
    //                     //             onMouseDown={(e) => e.preventDefault()}
    //                     //         >
    //                     //         <Unarchive />
    //                     //         </IconButton>
    //                     //     </InputAdornment>
    //                     // }
    //                 />
    //             <Typography color="secondary">
    //                 {preset.history.collection + ": " + preset.history.name + " (" + preset.history.index + ")"}
    //             </Typography>
    //         </Collapse>
    //     );
    // }

    private renamePreset(preset: Preset, newName?: string) {

    }

    private toggleExpanded(index: number) {
        const newExpanded = this.state.expanded.slice();
        newExpanded[index] = !this.state.expanded[index];
        this.setState({ expanded: newExpanded });
    }

    private toggleSelected(index: number) {
        const preset = this.props.presets[index];
        const selected = !preset.selected;
        this.props.selectPresets([preset], selected);
    }
}