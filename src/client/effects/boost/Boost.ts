import * as Model from "../../../model/Boost";
import { ItemUI } from "../../ItemUI";

export interface Boost extends Model.Boost {
    ui: ItemUI;

    origin: Model.Boost;
}