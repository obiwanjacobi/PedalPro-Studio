import { Dispatch } from "react-redux";

import { StorageBank } from "./StorageBank";
import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient, PresetsClient } from "../Client";
import { createAddFaultAction, AddFaultAction } from "../AddFaultAction";

export interface LoadStorageBanksAction {
    readonly type: "R/storage/*";
    readonly banks: StorageBank[];
}

export const createLoadStorageBanksAction = (banks: StorageBank[]): LoadStorageBanksAction => {
    return { type: "R/storage/*", banks: banks };
};

const loadStorageBanks = async (presetClient: PresetsClient, dispatch: Dispatch<LoadStorageBanksAction>) => {
    const banks = await presetClient.getStorageBanks();
    dispatch(createLoadStorageBanksAction(banks));
};

export async function dispatchLoadStorageBanksAction(
    dispatch: Dispatch<LoadStorageBanksAction | AddFaultAction>): Promise<void> {
    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        loadStorageBanks(presetClient, dispatch);
    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface LoadStorageBanks {
    loadStorageBanks(): void;
}