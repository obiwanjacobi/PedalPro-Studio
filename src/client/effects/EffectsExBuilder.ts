import * as Lodash from "lodash";

import { ItemBuilder, CopyOption } from "../StateBuilder";
import { EffectsEx, EffectNames } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI, itemUiModify } from "../ItemUI";
import { DspType } from "../../model/Dsp";
import { 
    DspDoubleDelayDefault, DspCaveDelayDefault, DspSingleTapDefault, DspFourTapsDefault, 
    DspTripleDelayDefault, DspPlateDefault, DspCustomSpringDefault, DspHallDefault, DspFreeVerbDefault 
} from "./dsp/DspDefaults";

export class EffectsExBuilder extends ItemBuilder<EffectsEx> {
    public static createForDspType(type: DspType | undefined): RecursivePartial<EffectsEx> {
        if (type) {
            switch (type) {
                case DspType.DoubleDelay:
                    return { dsp: { type: type, doubleDelay: Lodash.cloneDeep(DspDoubleDelayDefault) } };
                case DspType.CaveDelay:
                    return { dsp: { type: type, caveDelay: Lodash.cloneDeep(DspCaveDelayDefault) } };
                case DspType.SingleTap:
                    return { dsp: { type: type, singleTap: Lodash.cloneDeep(DspSingleTapDefault) } };
                case DspType.FourTapsDelay:
                    return { dsp: { type: type, fourTapsDelay: Lodash.cloneDeep(DspFourTapsDefault) } };
                case DspType.TripleDelay:
                    return { dsp: { type: type, tripleDelay: Lodash.cloneDeep(DspTripleDelayDefault) } };
                case DspType.Plate:
                    return { dsp: { type: type, plate: Lodash.cloneDeep(DspPlateDefault) } };
                case DspType.CustomSpring:
                    return { dsp: { type: type, customSpring: Lodash.cloneDeep(DspCustomSpringDefault) } };
                case DspType.Hall:
                    return { dsp: { type: type, hall: Lodash.cloneDeep(DspHallDefault) } };
                case DspType.FreeVerb:
                    return { dsp: { type: type, freeVerb: Lodash.cloneDeep(DspFreeVerbDefault) } };
                default:
                    break;
            }
        }

        return {};
    }

    public constructor(state: EffectsEx, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public merge(source: RecursivePartial<EffectsEx>) {
        Lodash.merge(this.mutable, source);
    }

    public changeUIByName(effectName: EffectNames, ui: Partial<ItemUI>) {
        // @ts-ignore: implicit any
        const effect = this.mutable[effectName];
        effect.ui = itemUiModify(effect, ui);
    }
}