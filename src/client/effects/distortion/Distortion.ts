import * as Model from "../../../model/Distortion";
import { ItemUI } from "../../ItemUI";

export interface Distortion extends Model.Distortion {
    ui: ItemUI;

    origin: Model.Distortion;
}