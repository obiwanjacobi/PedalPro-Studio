import * as React from "react";
import { Grid, AppBar, Tabs, Tab } from "material-ui";

import Preset from "../model/Preset";

import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";

export interface LocalPresetTabProps {
    presets: Preset[];
}
export interface LocalPresetTabState {
    selectedIndices: number[];
}

export class LocalPresetTab extends React.Component<LocalPresetTabProps, LocalPresetTabState> {
    public componentWillReceiveProps(nextProps: Readonly<LocalPresetTabProps>, nextContext: any) {
        if (!this.state) {
            this.setState({ selectedIndices: new Array<number>() }); 
        }
    }

    public render() {
        const self = this;
        return (
            <div>
                <LocalPresetToolbar enableCopy={this.hasSelection} />
                <PresetView 
                    presets={this.props.presets} 
                    onSelectionChanged={(preset: Preset, selected: boolean, index: number) => {
                        self.onSelectionChanged(preset, selected); }}
                />
            </div>
        );
    }

    private get hasSelection(): boolean {
        if (!this.state) { return false; }
        return this.state.selectedIndices.length > 0;
    }

    private onSelectionChanged(preset: Preset, selected: boolean) {
        const current = this.state.selectedIndices.indexOf(preset.index);
        let newSelected = [...this.state.selectedIndices];

        if (current === -1 && selected) {
            newSelected.push(preset.index);
        } else {
            newSelected.splice(current, 1);
        }

        this.setState({ selectedIndices: newSelected });
    }
}