/// <reference types="react" />
import * as React from "react";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";
export interface PresetViewStateProps {
    presets: Preset[];
}
export interface PresetViewState {
    searchKey: string;
}
export declare type PresetViewAllProps = PresetViewStateProps & SelectPresets & EditPreset & MovePreset;
export declare class PresetView extends React.PureComponent<PresetViewAllProps, PresetViewState> {
    constructor(props: PresetViewAllProps);
    render(): JSX.Element;
    private clearSearch();
    private searchHandler(e);
    private search(value);
}
