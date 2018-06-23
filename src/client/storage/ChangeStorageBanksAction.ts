import { ItemUI } from "../ItemUI";
import { StorageBank } from "./StorageBank";

export interface ChangeStorageBanksAction {
    readonly type: "U/storage/*/ui";
    readonly banks: StorageBank[];
    readonly ui: Partial<ItemUI>;
}

export const createChangeStorageBanksAction = 
    (banks: StorageBank[], command: Partial<ItemUI>): ChangeStorageBanksAction => {
    return { 
        type: "U/storage/*/ui", 
        banks: banks, 
        ui: command
    };
};

export interface ChangeStorageBanks {
    changeStorageBanks(banks: StorageBank[], command: Partial<ItemUI>): void;
}