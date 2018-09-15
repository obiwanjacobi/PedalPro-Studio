import * as Model from "../../../model/Filters";
import { ItemUI } from "../../ItemUI";

export interface Filters extends Model.Filters {
    ui: ItemUI;

    origin: Model.Filters;
}