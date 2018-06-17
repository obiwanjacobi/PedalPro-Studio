import { Dispatch } from "react-redux";

import { StorageBank } from "./StorageBank";
import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient, PresetsClient } from "../Client";

export interface LoadBanksAction {
    readonly type: "R/storage/*";
    readonly banks?: StorageBank[];
    readonly error?: Error;
}

export const createLoadBanksAction = (banks: StorageBank[]): LoadBanksAction => {
    return { type: "R/storage/*", banks: banks };
};

export const createLoadBanksErrorAction = (error: Error): LoadBanksAction => {
    return { type: "R/storage/*", error: error };
};

const loadStorageBanks = async (presetClient: PresetsClient, dispatch: Dispatch<LoadBanksAction>) => {
    const banks = await presetClient.getBanks();
    dispatch(createLoadBanksAction(banks));
};

export async function dispatchLoadBanksAction(dispatch: Dispatch<LoadBanksAction>): Promise<void> {
    const presetClient = DefaultClient.getSource(PresetCollectionType.storage);

    try {
        loadStorageBanks(presetClient, dispatch);
    } catch (error) {
        dispatch(createLoadBanksErrorAction(error));
    }
}

export interface LoadStorageBanks {
    loadStorageBanks(): void;
}