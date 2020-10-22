import * as Model from "../../../model/Phaser";
import { ItemUI } from "../../ItemUI";

export interface Phaser extends Model.Phaser {
    ui: ItemUI;

    origin: Model.Phaser;
}