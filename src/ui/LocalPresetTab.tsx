import * as React from "react";

import Preset from "../client/Preset";

import * as PresetActions from "./CommonPresetActions";
import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";

export interface LocalPresetTabProps {
    presets: Preset[];
}
export interface LocalPresetTabState { }

export type LocalPresetTabAllProps = LocalPresetTabProps & PresetActions.SelectPresets;
export class LocalPresetTab extends React.Component<LocalPresetTabAllProps, LocalPresetTabState> {

    public render() {
        return (
            <div>
                <LocalPresetToolbar enableCopy={this.hasSelection} />
                <PresetView 
                    presets={this.props.presets}
                    selectPresets={this.actions.selectPresets}
                />
            </div>
        );
    }

    private get actions(): Readonly<PresetActions.SelectPresets> {
        return this.props;
    }
    
    private get hasSelection(): boolean {
        if (!this.props.presets) { return false; }
        return this.props.presets.filter((preset: Preset) => preset.selected).length > 0;
    }
}