import { Dispatch } from "react-redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { Preset } from "../preset/Preset";
import { progressSaveStoragePresets } from "./SaveStoragePresetOperation";

export interface SaveStoragePresetsAction {
    readonly type: "U/storage/*/presets/";
    readonly presets?: Preset[];
    readonly error?: Error;
}

export const createSaveStoragePresetsErrorAction = (error: Error): SaveStoragePresetsAction => {
    return {
        type: "U/storage/*/presets/", error: error
    };
};

export const createSaveStoragePresetsAction = (presets: Preset[]): SaveStoragePresetsAction => {
    return {
        type: "U/storage/*/presets/", presets: presets
    };
};

export async function dispatchSaveStoragePresetsAction(
    dispatch: Dispatch<SaveStoragePresetsAction>, presets: Preset[]): Promise<void> {

    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        progressSaveStoragePresets(presetClient, presets, dispatch);
    } catch (error) {
        dispatch(createSaveStoragePresetsErrorAction(error));
    }
}

export interface SaveStoragePresets {
    saveStoragePresets(presets: Preset[]): void;
}