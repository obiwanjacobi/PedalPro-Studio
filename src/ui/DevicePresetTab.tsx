import * as React from "react";

import Preset from "../model/Preset";
import EntityFilter from "../model/EntityFilter";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface DevicePresetTabProps { 
    presets: Preset[];
}
export interface DevicePresetTabActions {
    loadPresets(source: string, filter: EntityFilter | null): Promise<void>;
}

export type DevicePresetTabAllProps = DevicePresetTabProps & DevicePresetTabActions;

export default class DevicePresetTab extends React.Component<DevicePresetTabAllProps> {
    public render() {
        return (
            <div>
                <PresetToolbar 
                    enableCopy={true} 
                    enableDownload={true} 
                    enableUpload={this.props.presets.length > 0}
                    onDownload={() => this.download()}
                />
                <PresetView 
                    presets={this.props.presets}
                    // onSelectionChanged={(preset: Preset, selected: boolean) => {
                    //     self.onSelectionChanged(preset, selected); }}
                />
            </div>
        );
    }

    protected get actions(): DevicePresetTabActions {
        return this.props;
    }

    private download() {
        this.actions.loadPresets("device", null);
    }
}