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

export interface PresetListItemProps { 
    preset: Preset;
}
export type PresetListItemActions = SelectPresets; // & EditPreset & MovePreset;
export interface PresetListItemState {
    expanded: boolean;
    name: string;
}

export type PresetListItemAllProps = PresetListItemProps & PresetListItemActions;

const styles = {
    smallIcon: {
      width: 20,
      height: 20,
    }
};

export default class PresetListItem extends React.Component<PresetListItemAllProps, PresetListItemState> {
    constructor(props: PresetListItemAllProps) {
        super(props);
        this.state = { expanded: false, name: "" };
        // bind event handlers
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Paper elevation={2}>
                    <Grid container={true} alignItems="center" spacing={8}>
                        <Grid xs={2} item={true}>
                            <Tooltip title="Current Preset index. Click to select Preset." placement="top">
                                <Checkbox 
                                    checked={this.props.preset.selected} 
                                    onClick={this.toggleSelected}
                                    icon={this.formatIndex()}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid xs={8} item={true}>
                            <Typography type="subheading">{this.props.preset.name}</Typography>
                        </Grid>
                        <Grid xs={1} item={true}>
                            <Tooltip title="Click to expand." placement="left">
                                <IconButton onClick={this.toggleExpanded} >
                                    {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    {/* <Collapse in={this.state.expanded[index]}>
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
                                        color="accent"
                                        disabled={!this.canSave(preset, index)}
                                        onClick={() => this.save(preset, index)}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item={true} xs={12} />
                        </Grid>         
                    </Collapse> */}
                </Paper>
        );
    }

    private formatIndex(): string {
        const index = this.props.preset.index;
        return (String(0).repeat(3) + String(index)).slice(String(index).length);
    }

    private toggleExpanded() {
        this.setState({ expanded: !this.state.expanded, name: this.state.name });
    }

    private toggleSelected() {
        this.props.selectPresets([this.props.preset], !this.props.preset.selected);
    }
}