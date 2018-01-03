import * as React from "react";
import { TextField } from "material-ui";

import Preset from "../client/Preset";
import * as PresetActions from "./CommonPresetActions";
import { PresetList } from "./PresetList";

export interface PresetViewStateProps { 
    presets: Preset[];
}

export interface PresetViewState {
    searchKey: string;
}

export type PresetViewAllProps = PresetViewStateProps & PresetActions.PresetSelected;

export class PresetView extends React.Component<PresetViewAllProps, PresetViewState> {
    public constructor(props: PresetViewAllProps) {
        super(props);
        this.state = { searchKey: "" };
    }

    public render() {
        if (!this.props.presets) { return <div>Loading...</div>; }

        return (
            <div>
                <TextField 
                    placeholder="Type to Filter"
                    fullWidth={true}
                    value={this.state.searchKey}
                    disabled={this.props.presets.length === 0}
                    onChange={(e) => this.search(e)}
                />
                <PresetList
                    presets={this.filteredPresets}
                    presetSelected={this.props.presetSelected}
                />
            </div>
        );
    }

    private get filteredPresets(): Preset[] {
        if (this.state.searchKey.length === 0) {
            return this.props.presets;
        }

        return this.props.presets.filter((preset: Preset) => 
            preset.name.toUpperCase().search(this.state.searchKey.toUpperCase()) >= 0);
    }

    private search(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState( { searchKey: e.target.value });
    }
}