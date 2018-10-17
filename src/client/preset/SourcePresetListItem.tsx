import * as React from "react";
import {
    Checkbox, Grid, Paper, ListItemText
} from "@material-ui/core";

import { Preset } from "./Preset";
import { ChangePresets } from "./ChangePresetsAction";
import { PresetCollectionType } from "../ApplicationDocument";
import { formatPresetFullName } from "./PresetOperations";

export interface SourcePresetListItemProps {
    preset: Preset;
}
export type SourcePresetListItemAllProps = SourcePresetListItemProps & Partial<ChangePresets>;

export class SourcePresetListItem extends React.Component<SourcePresetListItemAllProps> {
    public constructor(props: SourcePresetListItemAllProps) {
        super(props);
        this.onToggleSelectPreset = this.onToggleSelectPreset.bind(this);
    }

    public render() {
        return (
            <Paper
                elevation={2}
                style={{ width: "100%", paddingLeft: "8px", paddingTop: "4px", paddingBottom: "4px" }}
            >
                <Grid container={true}>
                    <Grid item={true} xs={3}>
                        {this.props.changePresets &&
                            <Checkbox
                                tabIndex={-1}
                                checked={this.props.preset.ui.selected}
                                onClick={this.onToggleSelectPreset}
                            />
                        }
                    </Grid>
                    <Grid item={true} xs={9}>
                        <ListItemText primary={this.title} secondary={this.props.preset.source.toUpperCase()} />
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    private get title() {
        return formatPresetFullName(this.props.preset);
    }

    private onToggleSelectPreset(_: React.MouseEvent<HTMLElement>) {
        if (this.props.changePresets) {
            this.props.changePresets(
                [this.props.preset], PresetCollectionType.clipboard,
                { selected: !this.props.preset.ui.selected });
        }
    }
}
