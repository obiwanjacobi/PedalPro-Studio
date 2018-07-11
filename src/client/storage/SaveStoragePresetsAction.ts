import { Dispatch } from "react-redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { Preset } from "../preset/Preset";
import { progressSaveStoragePresets } from "./SaveStoragePresetOperation";
import { AddFaultAction, createAddFaultAction } from "../AddFaultAction";

export interface SaveStoragePresetsAction {
    readonly type: "U/storage/*/presets/";
    readonly presets: Preset[];
}

export const createSaveStoragePresetsAction = (presets: Preset[]): SaveStoragePresetsAction => {
    return {
        type: "U/storage/*/presets/", presets: presets
    };
};

export async function dispatchSaveStoragePresetsAction(
    dispatch: Dispatch<SaveStoragePresetsAction | AddFaultAction>, presets: Preset[]): Promise<void> {

    try {
        const presetClient = DefaultClient.getSource(PresetCollectionType.storage);
        progressSaveStoragePresets(presetClient, presets, dispatch);
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface SaveStoragePresets {
    saveStoragePresets(presets: Preset[]): void;
}