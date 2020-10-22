import * as Model from "../../../model/Volume";
import { ItemUI } from "../../ItemUI";

export interface Volume extends Model.Volume {
    ui: ItemUI;

    origin: Model.Volume;
}