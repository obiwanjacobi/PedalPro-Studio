/// <reference types="react" />
import * as React from "react";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";
export interface PresetListProps {
    presets: Preset[];
    filter: string;
}
export declare type PresetListActions = SelectPresets & EditPreset & MovePreset;
export interface PresetListState {
}
export declare type PresetListAllProps = PresetListProps & PresetListActions;
export declare class PresetList extends React.PureComponent<PresetListAllProps, PresetListState> {
    shouldComponentUpdate(nextProps: PresetListAllProps, _: PresetListState): boolean;
    render(): React.ReactNode;
    private presetSummary(preset);
    private isVisible(preset);
}
