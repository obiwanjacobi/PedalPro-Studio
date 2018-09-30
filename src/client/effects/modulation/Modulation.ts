import * as Model from "../../../model/Modulation";
import { ItemUI } from "../../ItemUI";

export enum ModulationComponentNames {
    Chorus = "chorus",
    Flanger = "flanger",
    Vibe = "vibe"
}

export interface Modulation extends Model.Modulation {
    ui: ItemUI;

    origin: Model.Modulation;
}