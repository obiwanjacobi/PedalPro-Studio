import { Dispatch } from "react-redux";
import { DefaultClient } from "../Client";
import { PresetCollectionType } from "../ApplicationDocument";
import { createAddFaultAction } from "../AddFaultAction";

export interface DeleteStorageBankAction {
    readonly type: "D/storage/[]";
    readonly bank: string;
}

export const createDeleteStorageBankAction = (bank: string): DeleteStorageBankAction => {
    return { type: "D/storage/[]", bank: bank };
};

export const dispatchDeleteStorageBankAction = (dispatch: Dispatch, bank: string) => {
    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        presetClient.deleteStorageBank(bank);
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
};

export interface DeleteStorageBank {
    deleteStorageBank(bank: string): void;
}