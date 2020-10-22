import * as Model from "../../../model/Delay";
import { ItemUI } from "../../ItemUI";

export interface Delay extends Model.Delay {
    ui: ItemUI;

    origin: Model.Delay;
}