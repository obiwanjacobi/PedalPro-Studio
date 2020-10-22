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
import { distinct } from "../../ArrayExtensions";

export async function dispatchSaveStoragePresetsAction(
    dispatch: Dispatch, banks: StorageBank[], presets: Preset[]): Promise<void> {

    try {
        const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

        if (presets.length) {
            // filter out deleted presets of banks that are not created yet.
            const banksNotCreated = banks.filter(b => !b.created);
            const presetsToSave = presets.filter(p =>
                // @ts-ignore: possible undefined: p.group
                !(banksNotCreated.findIndex(b => b.name === p.group.name) >= 0 && p.ui.markedDeleted));

            const presetsDeleted = presetsToSave.filter(p => p.ui.markedDeleted);
            const presetsMoved = presetsToSave.filter(p =>
                p.index !== p.origin.index &&
                // @ts-ignore: possible undefined: p.group
                p.group.name === p.group.originName);
            const presetsChanged = presetsToSave.filter(p =>
                presetsDeleted.indexOf(p) < 0 && presetsMoved.indexOf(p) < 0);

            const orderOfExecution = new Array<Preset>();
            // 1st remove deleted presets
            orderOfExecution.push(...presetsDeleted);
            // 2nd remove old positions of moved presets
            orderOfExecution.push(...presetsMoved.map(p => {
                return {
                    ...p,
                    index: p.origin.index,
                    traits: {
                        ...p.traits,
                        empty: true,    // will delete empty
                    }
                };
            }));
            // 3rd add new positions of moved presets
            orderOfExecution.push(...presetsMoved);
            // 4th add changed presets
            orderOfExecution.push(...presetsChanged);

            progressSaveStoragePresets(presetClient, distinct(orderOfExecution), dispatch);
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