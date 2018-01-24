/// <reference types="react" />
import * as React from "react";
import Preset from "../client/Preset";
import { EditPreset } from "../client/EditPresetAction";
export interface PresetListItemDetailProps {
    preset: Preset;
}
export declare type PresetListItemDetailActions = EditPreset;
export interface PresetListItemDetailState {
    name: string;
}
export declare type PresetListItemDetailAllProps = PresetListItemDetailProps & PresetListItemDetailActions;
export default class PresetListItemDetail extends React.PureComponent<PresetListItemDetailAllProps, PresetListItemDetailState> {
    constructor(props: PresetListItemDetailAllProps);
    shouldComponentUpdate(nextProps: PresetListItemDetailAllProps, nextState: PresetListItemDetailState): boolean;
    componentWillReceiveProps(nextProps: PresetListItemDetailAllProps, _: PresetListItemDetailState): void;
    render(): React.ReactNode;
    private readonly canMoveUp;
    private readonly canSave;
    private readonly canUndo;
    private updateNameHandler(e);
    private updateName(name);
    private undoName();
    private save();
}
