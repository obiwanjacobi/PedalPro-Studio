import * as React from "react";

import Preset from "../client/Preset";
import * as PresetActions from "./CommonPresetActions";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface DevicePresetTabProps { 
    presets: Preset[];
}
export type DevicePresetTabActions = PresetActions.Selected & PresetActions.LoadPresets;
export type DevicePresetTabAllProps = DevicePresetTabProps & DevicePresetTabActions;

export default class DevicePresetTab extends React.Component<DevicePresetTabAllProps> {
    public render() {
        return (
            <div>
                <PresetToolbar 
                    enableCopy={this.hasSelection} 
                    enableDownload={true} 
                    enableUpload={this.props.presets.length > 0}
                    onDownload={() => this.download()}
                />
                <PresetView 
                    presets={this.props.presets}
                    presetSelected={(preset: Preset, selected: boolean) => 
                        this.actions.presetSelected(preset, selected)}
                />
            </div>
        );
    }

    protected get actions(): DevicePresetTabActions {
        return this.props;
    }

    private get hasSelection(): boolean {
        if (!this.props.presets) { return false; }
        return this.props.presets.filter((preset) => preset.selected).length > 0;
    }

    private download() {
        this.actions.loadPresets("device", null);
    }
}