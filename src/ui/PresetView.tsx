import * as React from "react";
import { TextField, Grid } from "material-ui";
import Clear from "material-ui-icons/Clear";
import IconButton from "material-ui/IconButton/IconButton";

import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { PresetList } from "./PresetList";

export interface PresetViewStateProps { 
    presets: Preset[];
}

export interface PresetViewState {
    searchKey: string;
}

export type PresetViewAllProps = PresetViewStateProps & SelectPresets & EditPreset;

export class PresetView extends React.Component<PresetViewAllProps, PresetViewState> {
    public constructor(props: PresetViewAllProps) {
        super(props);
        this.state = { searchKey: "" };
    }

    public render() {
        if (!this.props.presets) { return <div>Loading...</div>; }

        return (
            <Grid container={true}>
                <Grid xs={11} item={true}>
                    <TextField 
                        placeholder="Type to Filter Presets"
                        // fullWidth={true}
                        value={this.state.searchKey}
                        disabled={this.props.presets.length === 0}
                        onChange={(e) => this.search(e.target.value)}
                    />
                </Grid>
                <Grid xs={1} item={true}>
                    <IconButton onClick={() => this.search("")}>
                        <Clear/>
                    </IconButton>
                </Grid>
                <Grid xs={12} item={true}>
                    <PresetList
                        presets={this.filteredPresets}
                        selectPresets={this.props.selectPresets}
                        editPreset={this.props.editPreset}
                    />
                </Grid>
            </Grid>
        );
    }

    private get filteredPresets(): Preset[] {
        if (this.state.searchKey.length === 0) {
            return this.props.presets;
        }

        return this.props.presets.filter((preset: Preset) => 
            preset.name.toUpperCase().search(this.state.searchKey.toUpperCase()) >= 0);
    }

    private search(value: string) {
        this.setState( { searchKey: value });
    }
}