import { StorageBank } from "./StorageBank";
import { PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient, PresetsClient } from "./Client";
import { Dispatch } from "react-redux";

export const LoadBanksActionKey: string = "R/storage/*";

export interface LoadBanksAction {
    readonly type: "R/storage/*";
    readonly banks?: StorageBank[];
    readonly error?: Error;
}

export const createLoadBanksAction = (banks: StorageBank[]) => {
    return { type: LoadBanksActionKey, banks: banks };
};

export const createLoadBanksErrorAction = (error: Error) => {
    return { type: LoadBanksActionKey, error: error };
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