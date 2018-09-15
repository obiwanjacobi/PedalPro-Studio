import * as Model from "../../../model/PreAmp";
import { ItemUI } from "../../ItemUI";

export interface PreAmp extends Model.PreAmp {
    ui: ItemUI;

    origin: Model.PreAmp;
}