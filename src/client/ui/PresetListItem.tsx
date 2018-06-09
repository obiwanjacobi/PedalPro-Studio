import * as React from "react";
import { Collapse, Grid, Paper, Checkbox, IconButton, Typography } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

import { PresetChangedFlag } from "../controls/PresetChangedFlag";
import { PresetListItemDetail } from "./PresetListItemDetail";
import { Preset } from "../Preset";
import { ChangePresets } from "../ChangePresetsAction";
import { EditPreset } from "../EditPresetAction";
import { MovePresets } from "../MovePresetsAction";
import { DeletePresets } from "../DeletePresetsAction";
import { PresetCollectionType } from "../ApplicationDocument";
import { formatPresetIndex } from "../PresetOperations";

export interface PresetListItemProps { 
    preset: Preset;
    maxPresetCount: number;
}
export type PresetListItemActions = ChangePresets & Partial<EditPreset> & Partial<MovePresets> & Partial<DeletePresets>;
export interface PresetListItemState { }

export type PresetListItemAllProps = PresetListItemProps & PresetListItemActions;

export class PresetListItem extends React.Component<PresetListItemAllProps, PresetListItemState> {
    constructor(props: PresetListItemAllProps) {
        super(props);
        // bind event handlers
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.editPreset = this.editPreset.bind(this);
        this.movePresets = this.movePresets.bind(this);
        this.deletePresets = this.deletePresets.bind(this);
    }

    public shouldComponentUpdate(nextProps: PresetListItemAllProps, _: PresetListItemState): boolean {
        return this.props.preset !== nextProps.preset;
    }

    public render(): React.ReactNode {
        return (
            <Paper elevation={2} style={{width: "100%"}}>
                <Grid container={true} alignItems="center" spacing={8}>
                    <Grid xs={2} item={true}>
                        <Checkbox 
                            checked={this.props.preset.ui.selected} 
                            onClick={this.toggleSelected}
                            icon={this.formatIndex()}
                        />
                    </Grid>
                    <Grid xs={7} item={true}>
                        <Typography variant="subheading">
                            {this.props.preset.name}
                        </Typography>
                        {this.props.preset.group && 
                            <Typography variant="caption">{this.props.preset.group.name}</Typography>}
                    </Grid>
                    <Grid xs={1} item={true}>
                        <PresetChangedFlag preset={this.props.preset} />
                    </Grid>
                    <Grid xs={1} item={true}>
                        {this.hasDetails &&
                        <IconButton onClick={this.toggleExpanded} >
                            {this.props.preset.ui.expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>}
                    </Grid>
                </Grid>
                {this.hasDetails &&
                <Collapse in={this.props.preset.ui.expanded}>
                    {this.props.preset.ui.expanded ? 
                        <PresetListItemDetail
                            preset={this.props.preset}
                            editPreset={this.editPreset}
                            movePresets={this.movePresets}
                            deletePresets={this.deletePresets}
                            maxPresetCount={this.props.maxPresetCount}
                        /> : null
                    }
                </Collapse>}
            </Paper>
        );
    }

    private get hasDetails() {
        return this.props.editPreset;
    }
    private formatIndex(): string {
        return formatPresetIndex(this.props.preset);
    }
    
    private toggleExpanded() {
        this.props.changePresets(
            [this.props.preset], this.props.preset.source,
            {expanded: !this.props.preset.ui.expanded});
    }

    private toggleSelected() {
        this.props.changePresets(
            [this.props.preset], this.props.preset.source,
            {selected: !this.props.preset.ui.selected});
    }

    private editPreset(preset: Preset, update: Partial<Preset>) {
        if (this.props.editPreset) {
            this.props.editPreset(preset, update);
        }
    }

    private movePresets(presets: Preset[], targetIndex: number) {
        if (this.props.movePresets) {
            this.props.movePresets(presets, targetIndex);
        }
    }

    private deletePresets(source: PresetCollectionType, presets: Preset[]) {
        if (this.props.deletePresets) {
            this.props.deletePresets(source, presets);
        }
    }
}