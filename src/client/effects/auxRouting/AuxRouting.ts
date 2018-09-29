import * as Model from "../../../model/AuxRouting";
import { ItemUI } from "../../ItemUI";

export enum AuxRoutingComponentNames {
    Pedals = "pedals",
    Mixer = "mixer"
}

export interface Aux extends Model.Aux {
    ui: ItemUI;

    origin: Model.Aux;
}