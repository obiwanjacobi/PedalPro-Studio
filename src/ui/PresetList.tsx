import * as React from "react";
import { Grid } from "material-ui";

import PresetListItem from "./PresetListItem";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListProps {
    presets: Preset[];
    filter: string;
}
export type PresetListActions = SelectPresets & EditPreset & MovePreset;
export interface PresetListState { }

export type PresetListAllProps = PresetListProps & PresetListActions;

const styles = {
    hidden: {
        display: "none"
    }
};

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {

    public shouldComponentUpdate(nextProps: PresetListAllProps, _: PresetListState): boolean {
        return (
            this.props.presets !== nextProps.presets || 
            this.props.filter !== nextProps.filter
        );
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div />; }

        return ( 
            <Grid container={true}>
                    {this.props.presets.map(
                        (preset: Preset) => this.presetSummary(preset)
                    )}
            </Grid>
        );
    }

    private presetSummary(preset: Preset): React.ReactNode {
        return (
            <Grid 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                xl={2} 
                item={true} 
                key={preset.index}
                style={!this.isVisible(preset) ? styles.hidden : {}}
            >
                <PresetListItem
                    preset={preset}
                    selectPresets={this.props.selectPresets}
                    editPreset={this.props.editPreset}
                    // movePreset={this.props.movePreset}
                />
            </Grid>
        );
    }

    private isVisible(preset: Preset): boolean {
        if (!this.props.filter || this.props.filter.length === 0) {
            return true;
        }
        return preset.name.toUpperCase().search(this.props.filter.toUpperCase()) >= 0;
    }
}