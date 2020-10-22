import * as Model from "../../../model/PreAmp";
import { ItemUI } from "../../ItemUI";

export enum PreAmpComponentNames {
    None = "",
    Emphasis = "emphasis",
    DistortionDiode = "distortionDiode",
    DistortionFet = "distortionFet",
    Fuzz = "fuzz",
    Equalizer = "equalizer"
}

export interface PreAmp extends Model.PreAmp {
    ui: ItemUI;

    origin: Model.PreAmp;
}