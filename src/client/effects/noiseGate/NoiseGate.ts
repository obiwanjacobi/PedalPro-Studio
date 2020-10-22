import * as Model from "../../../model/NoiseGate";
import { ItemUI } from "../../ItemUI";

export interface NoiseGate extends Model.NoiseGate {
    ui: ItemUI;

    origin: Model.NoiseGate;
}