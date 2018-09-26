import * as Model from "../../../model/Filters";
import { ItemUI } from "../../ItemUI";

export enum FiltersComponentNames {
    PreFilter1 = "pre-filter1",
    PreFilter2 = "pre-filter2",
    PostFilter1 = "post-filter1",
    PostFilter2 = "post-filter2",
}

export interface Filters extends Model.Filters {
    ui: ItemUI;

    origin: Model.Filters;
}