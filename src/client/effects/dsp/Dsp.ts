import { RecursivePartial } from "../../../TypeExtensions";
import * as Model from "../../../model/Dsp";
import { ItemUI } from "../../ItemUI";

export function isNullForType(dsp: RecursivePartial<Dsp> | undefined): boolean {
    if (dsp && dsp.type) {
        switch (dsp.type) {
            case Model.DspType.DoubleDelay:
                return !dsp.doubleDelay;
            case Model.DspType.CaveDelay:
                return !dsp.caveDelay;
            case Model.DspType.SingleTap:
                return !dsp.singleTap;
            case Model.DspType.FourTapsDelay:
                return !dsp.fourTapsDelay;
            case Model.DspType.TripleDelay:
                return !dsp.tripleDelay;
            case Model.DspType.Plate:
                return !dsp.plate;
            case Model.DspType.CustomSpring:
                return !dsp.customSpring;
            case Model.DspType.Hall:
                return !dsp.hall;
            case Model.DspType.FreeVerb:
                return !dsp.freeVerb;
            default:
                break;
        }
    }
    return false;
}

export interface Dsp extends Model.Dsp {
    ui: ItemUI;

    origin: Model.Dsp;
}