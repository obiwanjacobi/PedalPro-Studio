import { Dispatch } from "react-redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { Preset } from "./Preset";
import { progressSavePresets } from "./SavePresetOperations";

export interface SavePresetsAction {
    readonly type: "U/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets?: Preset[];
    readonly error?: Error;
}

export const createSavePresetsErrorAction = (source: PresetCollectionType, error: Error): SavePresetsAction => {
    return {
        type: "U/*/presets/", source: source, error: error
    };
};

export const createSavePresetsAction = (source: PresetCollectionType, presets: Preset[]): SavePresetsAction => {
    return {
        type: "U/*/presets/", source: source, presets: presets
    };
};

export async function dispatchSavePresetsAction(
    dispatch: Dispatch<SavePresetsAction>, source: PresetCollectionType, presets: Preset[]): Promise<void> {

    const presetClient = DefaultClient.getSource(source);

    try {
        progressSavePresets(presetClient, source, presets, dispatch);
    } catch (error) {
        dispatch(createSavePresetsErrorAction(presetClient.collection, error));
    }
}

export interface SavePresets {
    savePresets(source: PresetCollectionType, presets: Preset[]): void;
}