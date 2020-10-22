import * as Model from "../../../model/Compressor";
import { ItemUI } from "../../ItemUI";

export interface Compressor extends Model.Compressor {
    ui: ItemUI;

    origin: Model.Compressor;
}