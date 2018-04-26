import { Preset } from "./Preset";
import { ItemUI, ItemWithUI } from "./ItemUI";

export interface StorageBank extends ItemWithUI {
    bank: string;
    presets: Preset[];
    ui: ItemUI;
}