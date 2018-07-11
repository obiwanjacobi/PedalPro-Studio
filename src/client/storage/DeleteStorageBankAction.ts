import { Dispatch } from "react-redux";
import { DefaultClient } from "../Client";
import { PresetCollectionType } from "../ApplicationDocument";
import { createAddFaultAction } from "../AddFaultAction";
import { createLoadStorageBanksAction } from "./LoadStorageBanksAction";

export async function dispatchDeleteStorageBankAction(dispatch: Dispatch, bank: string): Promise<void> {
    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        await presetClient.deleteStorageBank(bank);
        const banks = await presetClient.getStorageBanks();
        dispatch(createLoadStorageBanksAction(banks));
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface DeleteStorageBank {
    deleteStorageBank(bank: string): void;
}