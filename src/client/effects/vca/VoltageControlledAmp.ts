import * as Model from "../../../model/VoltageControlledAmp";
import { ItemUI } from "../../ItemUI";

export interface VoltageControlledAmp extends Model.VoltageControlledAmp {
    ui: ItemUI;

    origin: Model.VoltageControlledAmp;
}