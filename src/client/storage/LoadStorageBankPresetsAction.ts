import { Dispatch } from "react-redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient, PresetsClient } from "../Client";
import { Preset } from "../preset/Preset";
import { createAddFaultAction, AddFaultAction } from "../AddFaultAction";

export interface LoadStorageBankPresetsAction {
    readonly type: "R/storage/*/presets/";
    readonly bank: string;
    readonly presets: Preset[];
}

const createLoadStorageBankPresetsAction = (bank: string, presets: Preset[]): LoadStorageBankPresetsAction => {
    return { type: "R/storage/*/presets/", bank: bank, presets: presets };
};

async function loadStorageBankPresets(
    presetClient: PresetsClient, 
    dispatch: Dispatch<LoadStorageBankPresetsAction| AddFaultAction>, bank: string) {

    try {
        const presets = await presetClient.getStorageBankPresets(bank);
        dispatch(createLoadStorageBankPresetsAction(bank, presets));
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export async function dispatchLoadStorageBankPresetsAction(
    dispatch: Dispatch<LoadStorageBankPresetsAction | AddFaultAction>, bank: string): Promise<void> {

    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        await loadStorageBankPresets(presetClient, dispatch, bank);
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface LoadStorageBankPresets {
    loadStorageBankPresets(bank: string): void;
}