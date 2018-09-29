import * as Model from "../../../model/Filters";
import { ItemUI } from "../../ItemUI";

export enum FiltersComponentNames {
    Filter1 = "filter1",
    Filter2 = "filter2",
}

export interface Filters extends Model.Filters {
    ui: ItemUI;

    origin: Model.Filters;
}