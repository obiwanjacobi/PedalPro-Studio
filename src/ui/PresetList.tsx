import * as React from "react";
import Preset from "../model/Preset";
import { PresetSummary } from "../ui/PresetSummary";

export interface PresetListProps {
    presets: Preset[];
}

export interface PresetListState { }

export class PresetList extends React.Component<PresetListProps, PresetListState> {
    private static presetSummary(preset: Preset): React.ReactNode {
        return <PresetSummary name={preset.name} index={preset.index} />;
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div/>; }

        return (
            <div>
                {this.props.presets.map((preset) => PresetList.presetSummary(preset))}
            </div>
        );
    }
}