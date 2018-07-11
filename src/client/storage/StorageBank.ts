import { ItemWithUI } from "../ItemUI";
import * as ModelStorage from "../../model/Storage";

export interface StorageBank extends ItemWithUI {
    name: string;
    /**
     * Indicates that the Storage Presets were loaded for this Bank.
     */
    loaded: boolean;
    /**
     * Indicates that this Bank is physically created on storage.
     */
    created: boolean;
    origin: ModelStorage.Bank;
}