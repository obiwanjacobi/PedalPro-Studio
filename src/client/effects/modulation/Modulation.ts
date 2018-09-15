import * as Model from "../../../model/Modulation";
import { ItemUI } from "../../ItemUI";

export interface Modulation extends Model.Modulation {
    ui: ItemUI;

    origin: Model.Modulation;
}