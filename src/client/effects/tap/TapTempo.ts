import * as Model from "../../../model/TapTempo";
import { ItemUI } from "../../ItemUI";

export interface TapTempo extends Model.TapTempo {
    ui: ItemUI;

    origin: Model.TapTempo;
}