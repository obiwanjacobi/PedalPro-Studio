import { StorageBank } from "./StorageBank";
import { Preset } from "../preset/Preset";

export function bankNeedsLoading(bank?: StorageBank): boolean {
    if (bank) { return !bank.loaded && bank.created; }
    return false;
}

export function storagePresetsForBank(presets: Preset[], bank: string): Preset[] {
    return presets.filter(p => p.group && p.group.name === bank);
}

export function bankNameHasChanged(bank: StorageBank): boolean {
    return bank.name !== bank.origin.name;
}