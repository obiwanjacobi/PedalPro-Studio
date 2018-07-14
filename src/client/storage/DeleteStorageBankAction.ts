import { Dispatch } from "react-redux";
import { DefaultClient } from "../Client";
import { PresetCollectionType } from "../ApplicationDocument";
import { createAddFaultAction } from "../AddFaultAction";
import { StorageBank } from "./StorageBank";

export interface DeleteStorageBankAction {
    readonly type: "D/storage/[]";
    readonly bank: StorageBank;
}

export const createDeleteStorageBankAction = (bank: StorageBank): DeleteStorageBankAction => {
    return { type: "D/storage/[]", bank: bank };
};

export async function dispatchDeleteStorageBankAction(dispatch: Dispatch, bank: StorageBank): Promise<void> {
    try {
        const presetClient = DefaultClient.getSource(PresetCollectionType.storage);
        if (bank.created) {
            await presetClient.deleteStorageBank(bank.name);
        }
        dispatch(createDeleteStorageBankAction(bank));
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface DeleteStorageBank {
    deleteStorageBank(bank: StorageBank): void;
}