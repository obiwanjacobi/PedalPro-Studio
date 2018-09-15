import * as Model from "../../../model/Dsp";
import { ItemUI } from "../../ItemUI";

export interface Dsp extends Model.Dsp {
    ui: ItemUI;

    origin: Model.Dsp;
}