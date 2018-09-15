import * as Model from "../../../model/AuxRouting";
import { ItemUI } from "../../ItemUI";

export interface Aux extends Model.Aux {
    ui: ItemUI;

    origin: Model.Aux;
}