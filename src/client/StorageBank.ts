import { ItemWithUI } from "./ItemUI";
import * as ModelStorage from "../model/Storage";

export interface StorageBank extends ItemWithUI {
    name: string;
    loaded: boolean;
    created: boolean;
    origin: ModelStorage.Bank;
}