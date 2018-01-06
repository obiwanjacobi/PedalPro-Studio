import * as React from "react";

import Preset from "../client/Preset";
import * as PresetActions from "./CommonPresetActions";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface DevicePresetTabProps { 
    presets: Preset[];
}
export type DevicePresetTabActions = 
    PresetActions.SelectPresets & PresetActions.LoadPresets & PresetActions.CopyPresets;
export type DevicePresetTabAllProps = DevicePresetTabProps & DevicePresetTabActions;

export default class DevicePresetTab extends React.Component<DevicePresetTabAllProps> {
    public render() {
        return (
            <div>
                <PresetToolbar 
                    enableCopy={this.hasSelection}
                    onCopy={() => this.onCopySelected()}
                    enableDownload={true}
                    onDownload={() => this.download()}
                    enableUpload={this.props.presets.length > 0}
                    
                    enableSelectAll={this.props.presets.length > 0}
                    valueSelectAll={this.allSelectedValue}
                    onSelectAll={() => this.toggleSelectAll()}
                />
                <PresetView 
                    presets={this.props.presets}
                    selectPresets={this.actions.selectPresets}
                />
            </div>
        );
    }

    protected get actions(): DevicePresetTabActions {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.props.presets.filter((preset: Preset) => preset.selected);
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets, "local");
        }
    }

    private get hasSelection(): boolean {
        if (!this.props.presets) { return false; }
        return this.props.presets.filter((preset: Preset) => preset.selected).length > 0;
    }

    private get allSelected(): boolean {
        if (!this.props.presets) { return false; }
        return this.props.presets.every((preset: Preset) => preset.selected);
    }

    private get allSelectedValue(): number {
        if (this.allSelected) { return 1; }
        if (this.hasSelection) { return -1; }
        return 0;
    }

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, !this.allSelected);
    }

    private download() {
        this.actions.loadPresets("device");
    }
}