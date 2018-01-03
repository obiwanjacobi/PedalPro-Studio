import * as React from "react";

import Preset from "../client/Preset";

import * as PresetActions from "./CommonPresetActions";
import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";

export interface LocalPresetTabProps {
    presets: Preset[];
}
export interface LocalPresetTabState {
    selectedIndices: number[];
}

export type LocalPresetTabAllProps = LocalPresetTabProps & PresetActions.Selected;
export class LocalPresetTab extends React.Component<LocalPresetTabAllProps, LocalPresetTabState> {
    public componentWillReceiveProps(nextProps: Readonly<LocalPresetTabAllProps>, nextContext: {}) {
        if (!this.state) {
            this.setState({ selectedIndices: new Array<number>() });
        }
    }

    public render() {
        return (
            <div>
                <LocalPresetToolbar enableCopy={this.hasSelection} />
                <PresetView 
                    presets={this.props.presets}
                    presetSelected={this.actions.presetSelected}
                    // onSelectionChanged={(preset: Preset, selected: boolean) => {
                    //     this.onSelectionChanged(preset, selected); }}
                />
            </div>
        );
    }

    private get actions(): Readonly<PresetActions.Selected> {
        return this.props;
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