/// <reference types="react" />
import * as React from "react";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
export interface PresetListItemProps {
    preset: Preset;
}
export declare type PresetListItemActions = SelectPresets & EditPreset;
export interface PresetListItemState {
    expanded: boolean;
}
export declare type PresetListItemAllProps = PresetListItemProps & PresetListItemActions;
export default class PresetListItem extends React.PureComponent<PresetListItemAllProps, PresetListItemState> {
    constructor(props: PresetListItemAllProps);
    shouldComponentUpdate(nextProps: PresetListItemAllProps, nextState: PresetListItemState): boolean;
    render(): React.ReactNode;
    private formatIndex();
    private toggleExpanded();
    private toggleSelected();
}
