import { Dispatch } from "react-redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { Preset } from "../preset/Preset";
import { progressSaveStoragePresets } from "./SaveStoragePresetOperation";
import { createAddFaultAction } from "../AddFaultAction";

export async function dispatchSaveStoragePresetsAction(
    dispatch: Dispatch, presets: Preset[]): Promise<void> {

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