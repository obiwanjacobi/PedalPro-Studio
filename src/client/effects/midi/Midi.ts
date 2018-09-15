import * as Model from "../../../model/Midi";
import { ItemUI } from "../../ItemUI";

export interface Midi extends Model.Midi {
    ui: ItemUI;

    origin: Model.Midi;
}