import { Dispatch } from "react-redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient, PresetsClient } from "../Client";
import { Preset } from "../preset/Preset";

export interface LoadStorageBankPresetsAction {
    readonly type: "R/storage/*/presets/";
    readonly presets?: Preset[];
    readonly error?: Error;
}

export const createLoadStorageBankPresetsAction = (presets: Preset[]): LoadStorageBankPresetsAction => {
    return { type: "R/storage/*/presets/", presets: presets };
};

export const createLoadStorageBankPresetsErrorAction = (error: Error): LoadStorageBankPresetsAction => {
    return { type: "R/storage/*/presets/", error: error };
};

const loadStorageBankPresets = 
    async (presetClient: PresetsClient, dispatch: Dispatch<LoadStorageBankPresetsAction>, bank: string) => {

    try {
        const presets = await presetClient.getStorageBankPresets(bank);
        dispatch(createLoadStorageBankPresetsAction(presets));
    } catch (error) {
        throw error;
    }
};

export async function dispatchLoadStorageBankPresetsAction(
    dispatch: Dispatch<LoadStorageBankPresetsAction>, bank: string): Promise<void> {

    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        loadStorageBankPresets(presetClient, dispatch, bank);
    } catch (error) {
        dispatch(createLoadStorageBankPresetsErrorAction(error));
    }
}

export interface LoadStorageBankPresets {
    loadStorageBankPresets(bank: string): void;
}