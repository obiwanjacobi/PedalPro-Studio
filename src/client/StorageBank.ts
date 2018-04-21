import { Preset, ItemUI } from "./Preset";

export interface StorageBank {
    bank: string;
    presets: Preset[];
    ui: ItemUI;
}