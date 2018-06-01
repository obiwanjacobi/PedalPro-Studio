import { ItemUI } from "./ItemUI";
import { StorageBank } from "./StorageBank";

export interface ChangeBanksAction {
    readonly type: "U/storage/*/ui";
    readonly banks: StorageBank[];
    readonly ui: Partial<ItemUI>;
}

export const createChangeBanksAction = 
    (banks: StorageBank[], command: Partial<ItemUI>): ChangeBanksAction => {
    return { 
        type: "U/storage/*/ui", 
        banks: banks, 
        ui: command
    };
};

export interface ChangeBanks {
    changeBanks(banks: StorageBank[], command: Partial<ItemUI>): void;
}