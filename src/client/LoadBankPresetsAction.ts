import { Dispatch } from "react-redux";

import { PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient, PresetsClient } from "./Client";
import { Preset } from "./Preset";

export interface LoadBankPresetsAction {
    readonly type: "R/storage/*/presets/";
    readonly presets?: Preset[];
    readonly error?: Error;
}

export const createLoadBankPresetsAction = (presets: Preset[]): LoadBankPresetsAction => {
    return { type: "R/storage/*/presets/", presets: presets };
};

export const createLoadBankPresetsErrorAction = (error: Error): LoadBankPresetsAction => {
    return { type: "R/storage/*/presets/", error: error };
};

const loadBankPresets = 
    async (presetClient: PresetsClient, dispatch: Dispatch<LoadBankPresetsAction>, bank: string) => {

    const presets = await presetClient.getBankPresets(bank);
    dispatch(createLoadBankPresetsAction(presets));
};

export async function dispatchLoadBankPresetsAction(
    dispatch: Dispatch<LoadBankPresetsAction>, bank: string): Promise<void> {

    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        loadBankPresets(presetClient, dispatch, bank);
    } catch (error) {
        dispatch(createLoadBankPresetsErrorAction(error));
    }
}

export interface LoadBankPresets {
    loadBankPresets(bank: string): void;
}