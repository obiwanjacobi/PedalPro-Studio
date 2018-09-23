import { Dispatch } from "redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { Preset } from "../preset/Preset";
import { progressSaveStoragePresets } from "./SaveStoragePresetOperation";
import { createAddFaultAction } from "../AddFaultAction";
import { bankNameHasChanged } from "./BankOperations";
import { StorageBank } from "./StorageBank";
import { dispatchDeleteStorageBankAction } from "./DeleteStorageBankAction";
import { dispatchLoadStorageBanksAction } from "./LoadStorageBanksAction";

export async function dispatchSaveStoragePresetsAction(
    dispatch: Dispatch, banks: StorageBank[], presets: Preset[]): Promise<void> {

    try {
        const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

        if (presets.length) {
            // filter out deleted presets of banks that are not created yet.
            const banksNotCreated = banks.filter(b => !b.created);
            const presetsToSave = presets.filter(p  => 
                // @ts-ignore: possible undefined: p.group
                !(banksNotCreated.findIndex(b => b.name === p.group.name) >= 0 && p.ui.markedDeleted));
            progressSaveStoragePresets(presetClient, presetsToSave, dispatch);
        }

        const deletedBanks = banks
            .filter(b => b.ui.markedDeleted && b.created);
        deletedBanks.forEach(b => dispatchDeleteStorageBankAction(dispatch, b));

        const renamedBanks = banks
            .filter(b => b.created)
            .filter(bankNameHasChanged)
            .filter(b => b.origin.name.length > 0);
        renamedBanks.forEach(b => presetClient.deleteStorageBank(b.origin.name));

        await dispatchLoadStorageBanksAction(dispatch);
        
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface SaveStoragePresets {
    saveStoragePresets(banks: StorageBank[], presets: Preset[]): void;
}