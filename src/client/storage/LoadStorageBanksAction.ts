import { Dispatch } from "redux";

import { StorageBank } from "./StorageBank";
import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { createAddFaultAction } from "../AddFaultAction";
import { createCopyPresetsAction } from "../preset/CopyPresetsAction";

export interface LoadStorageBanksAction {
    readonly type: "R/storage/*";
    readonly banks: StorageBank[];
}

export const createLoadStorageBanksAction = (banks: StorageBank[]): LoadStorageBanksAction => {
    return { type: "R/storage/*", banks: banks };
};

export async function dispatchLoadStorageBanksAction(
    dispatch: Dispatch): Promise<void> {
    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        const banks = await presetClient.getStorageBanks();
        dispatch(createLoadStorageBanksAction(banks));

        // clear clipboard
        dispatch(createCopyPresetsAction([]));

    } catch (error) {
        dispatch(createAddFaultAction(PresetCollectionType.storage, error));
    }
}

export interface LoadStorageBanks {
    loadStorageBanks(): void;
}