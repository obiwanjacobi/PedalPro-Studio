import { ItemUI } from "./ItemUI";
import { StorageBank } from "./StorageBank";

export const ChangeBanksActionKey: string = "U/storage/banks/ui";

export interface ChangeBanksAction {
    readonly type: "U/storage/banks/ui";
    readonly banks: StorageBank[];
    readonly ui: Partial<ItemUI>;
}

export const createChangeBanksAction = 
    (banks: StorageBank[], command: Partial<ItemUI>): ChangeBanksAction => {
    return <ChangeBanksAction> { 
        type: ChangeBanksActionKey, 
        banks: banks, 
        ui: command
    };
};

export interface ChangeBanks {
    changeBanks(banks: StorageBank[], command: Partial<ItemUI>): void;
}