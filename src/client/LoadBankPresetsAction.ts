import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient, PresetsClient } from "./Client";
import { Preset } from "./Preset";

export const LoadBankPresetsActionKey: string = "R/storage/*/presets/";

export interface LoadBankPresetsAction {
    readonly type: "R/storage/*/presets/";
    readonly presets?: Preset[];
    readonly error?: Error;
}

export const createLoadBankPresetsAction = (presets: Preset[]) => {
    return { type: LoadBankPresetsActionKey, presets: presets };
};

export const createLoadBankPresetsErrorAction = (error: Error) => {
    return { type: LoadBankPresetsActionKey, error: error };
};

const loadBankPresets = async (presetClient: PresetsClient, dispatch: Dispatch<ApplicationDocument>, bank: string) => {
    const presets = await presetClient.getBankPresets(bank);
    dispatch(createLoadBankPresetsAction(presets));
};

export async function dispatchLoadBankPresetsAction(
    dispatch: Dispatch<ApplicationDocument>, bank: string): Promise<void> {

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