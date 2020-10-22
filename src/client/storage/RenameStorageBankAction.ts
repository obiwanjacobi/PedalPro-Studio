import { StorageBank } from "./StorageBank";

export interface RenameStorageBankAction {
    readonly type: "U/storage/[].name/presets/*.name";
    readonly bank: StorageBank;
    readonly newName: string;
}

export const createRenameStorageBankAction = (bank: StorageBank, newName: string): RenameStorageBankAction => {
    return { type: "U/storage/[].name/presets/*.name", bank: bank, newName: newName };
};

export interface RenameStorageBank {
    renameStorageBank(bank: StorageBank, newName: string): void;
}