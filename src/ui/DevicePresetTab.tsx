import * as React from "react";

import Preset from "../client/Preset";
import * as PresetActions from "./CommonPresetActions";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";
import { SelectedView } from "../client/Selected";

export interface DevicePresetTabProps { 
    presets: Preset[];
}
export type DevicePresetTabActions = 
    PresetActions.SelectPresets & PresetActions.LoadPresets & PresetActions.CopyPresets;
export type DevicePresetTabAllProps = DevicePresetTabProps & DevicePresetTabActions;

export default class DevicePresetTab extends React.Component<DevicePresetTabAllProps> {
    private selection: SelectedView<Preset>;

    public constructor(props: DevicePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
    }

    public render() {
        return (
            <div>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={() => this.onCopySelected()}
                    enableDownload={true}
                    onDownload={() => this.download()}
                    enableUpload={!this.selection.isEmpty}
                    enableSelectAll={!this.selection.isEmpty}
                    valueSelectAll={this.selection.toValue()}
                    onSelectAll={() => this.toggleSelectAll()}
                />
                <PresetView 
                    presets={this.props.presets}
                    selectPresets={this.actions.selectPresets}
                />
            </div>
        );
    }

    public componentWillReceiveProps(newProps: DevicePresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    protected get actions(): DevicePresetTabActions {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets, "local");
        }
    }

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, !this.selection.allSelected);
    }

    private download() {
        this.actions.loadPresets("device");
    }
}