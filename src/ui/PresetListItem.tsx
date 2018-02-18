import * as React from "react";
import { Collapse, Grid, Paper, Checkbox, Tooltip, IconButton } from "material-ui";
import Typography from "material-ui/Typography/Typography";
import { ExpandMore, ExpandLess } from "material-ui-icons";

import PresetListItemDetail from "./PresetListItemDetail";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListItemProps { 
    preset: Preset;
}
export type PresetListItemActions = SelectPresets & EditPreset & MovePreset;
export interface PresetListItemState { }

export type PresetListItemAllProps = PresetListItemProps & PresetListItemActions;

export default class PresetListItem extends React.Component<PresetListItemAllProps, PresetListItemState> {
    constructor(props: PresetListItemAllProps) {
        super(props);
        // bind event handlers
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    public shouldComponentUpdate(nextProps: PresetListItemAllProps, _: PresetListItemState): boolean {
        return this.props.preset !== nextProps.preset;
    }

    public render(): React.ReactNode {
        // console.log("Render Preset: " + this.props.preset.index);

        return (
            <Paper elevation={2} style={{width: "100%"}}>
                    <Grid container={true} alignItems="center" spacing={8}>
                        <Grid xs={2} item={true}>
                            <Tooltip title="Current Preset index. Click to select Preset." placement="top">
                                <Checkbox 
                                    checked={this.props.preset.uiSelected} 
                                    onClick={this.toggleSelected}
                                    icon={this.formatIndex()}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid xs={8} item={true}>
                            <Typography type="subheading">{this.props.preset.name}</Typography>
                        </Grid>
                        <Grid xs={1} item={true}>
                            <Tooltip 
                                title={this.props.preset.uiExpanded ? "Click to collapse." : "Click to expand."} 
                                placement="left"
                            >
                                <IconButton onClick={this.toggleExpanded} >
                                    {this.props.preset.uiExpanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Collapse in={this.props.preset.uiExpanded}>
                        {this.props.preset.uiExpanded ? 
                            <PresetListItemDetail
                                preset={this.props.preset}
                                editPreset={this.props.editPreset}
                                movePreset={this.props.movePreset}
                            /> : null
                        }
                    </Collapse>
                </Paper>
        );
    }

    private formatIndex(): string {
        const index = this.props.preset.index;
        // formats 3 digits with leading zeros
        return (String(0).repeat(3) + String(index)).slice(String(index).length);
    }
    
    private toggleExpanded() {
        // this.setState({ expanded: !this.state.expanded });
        this.props.selectPresets([this.props.preset], {expanded: !this.props.preset.uiExpanded});
    }

    private toggleSelected() {
        this.props.selectPresets([this.props.preset], {selected: !this.props.preset.uiSelected});
    }
}