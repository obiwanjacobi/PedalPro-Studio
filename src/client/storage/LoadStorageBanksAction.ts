import { Dispatch } from "react-redux";

import { StorageBank } from "./StorageBank";
import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient, PresetsClient } from "../Client";

export interface LoadStorageBanksAction {
    readonly type: "R/storage/*";
    readonly banks?: StorageBank[];
    readonly error?: Error;
}

export const createLoadStorageBanksAction = (banks: StorageBank[]): LoadStorageBanksAction => {
    return { type: "R/storage/*", banks: banks };
};

export const createLoadStorageBanksErrorAction = (error: Error): LoadStorageBanksAction => {
    return { type: "R/storage/*", error: error };
};

const loadStorageBanks = async (presetClient: PresetsClient, dispatch: Dispatch<LoadStorageBanksAction>) => {
    const banks = await presetClient.getStorageBanks();
    dispatch(createLoadStorageBanksAction(banks));
};

export async function dispatchLoadStorageBanksAction(dispatch: Dispatch<LoadStorageBanksAction>): Promise<void> {
    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        loadStorageBanks(presetClient, dispatch);
    } catch (error) {
        dispatch(createLoadStorageBanksErrorAction(error));
    }
}

export interface LoadStorageBanks {
    loadStorageBanks(): void;
}