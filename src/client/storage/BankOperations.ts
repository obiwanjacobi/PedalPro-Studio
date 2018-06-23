import { StorageBank } from "./StorageBank";

export function bankNeedsLoading(bank?: StorageBank): boolean {
    if (bank) { return !bank.loaded && bank.created; }
    return false;
}