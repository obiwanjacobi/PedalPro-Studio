import * as React from "react";

import Preset from "../client/Preset";

import * as PresetActions from "./CommonPresetActions";
import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";
import { SelectedView } from "../client/SelectedView";

export interface LocalPresetTabProps {
    activeCollection: string;
    presets: Preset[];
}
export type LocalPresetTabActions = PresetActions.SelectPresets & PresetActions.CopyPresets;
export type LocalPresetTabAllProps = LocalPresetTabProps & LocalPresetTabActions;

export class LocalPresetTab extends React.Component<LocalPresetTabAllProps> {
    private selection: SelectedView<Preset>;
    
    public constructor(props: LocalPresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
    }

    public render() {
        return (
            <div>
                <LocalPresetToolbar
                    enableCopy={this.enableCopy}
                    onCopy={() => this.onCopySelected()}
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

    public componentWillReceiveProps(newProps: LocalPresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    private get actions(): Readonly<LocalPresetTabActions> {
        return this.props;
    }
    
    private get enableCopy(): boolean {
        if (this.props.activeCollection === "factory") { return false; }
        return this.selection.anySelected;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets, this.props.activeCollection);
        }
    }

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, !this.selection.allSelected);
    }
}