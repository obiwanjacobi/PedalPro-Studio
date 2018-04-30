import { ItemUI, ItemWithUI } from "./ItemUI";

export interface StorageBank extends ItemWithUI {
    bank: string;
    loaded: boolean;
    ui: ItemUI;
}