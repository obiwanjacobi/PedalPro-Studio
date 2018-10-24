import * as Lodash from "lodash";

import {
    DoubleDelay, DoubleDelay3, DoubleDelay4,
    DspDoubleDelay, DspSingleTap, DspFourTapsDelay,
    DspCaveDelay, DspTripleDelay, DspPlate, DspHall, DspFreeVerb,
    CaveDelay1, CaveDelay2, CaveDelay3, CaveDelay4, DspCustomSpring, DspType
} from "../../../model/Dsp";
import { RecursivePartial } from "../../../TypeExtensions";
import { EffectsEx } from "../../../model/Effects";

const doubleDelayDefault: DoubleDelay = {
    feedback: 0,
    level: 50,
    delay: 20
};

const doubleDelay3Default: DoubleDelay3 = {
    feedback: 0,
    level: 50,
    delay: 120
};

const doubleDelay4Default: DoubleDelay4 = {
    feedback: 0,
    level: 50,
    delay: 240
};

const caveDelay1Default: CaveDelay1 = {
    feedback: 0,
    level: 50,
    delay: 20,
};

const caveDelay2Default: CaveDelay2 = {
    feedback: 0,
    level: 50,
    delay: 20,
};

const caveDelay3Default: CaveDelay3 = {
    feedback: 0,
    level: 50,
    delay: 60,
};

const caveDelay4Default: CaveDelay4 = {
    feedback: 0,
    level: 50,
    delay: 60,
};

const DspDoubleDelayDefault: DspDoubleDelay = {
    delay1: doubleDelayDefault,
    delay2: doubleDelayDefault,
    delay3: doubleDelay3Default,
    delay4: doubleDelay4Default,
    frequency1: 1000,
    frequency2: 1000,
    frequencyL: 1000,
    frequencyR: 1000,
    outL: 50,
    outR: 50
};

const DspCaveDelayDefault: DspCaveDelay = {
    delay1: caveDelay1Default,
    delay2: caveDelay2Default,
    delay3: caveDelay3Default,
    delay4: caveDelay4Default,
    frequency1: 1000,
    frequency2: 1000,
    frequencyL: 1000,
    frequencyR: 1000,
    outL: 50,
    outR: 50
};

const DspSingleTapDefault: DspSingleTap = {
    feedback: 0,
    frequency: 100,
    tempo: 120
};

const DspFourTapsDefault: DspFourTapsDelay = {
    feedback: 0,
    frequency: 1000,
    tap1: 60,
    tap2: 40,
    tap3: 30,
    tap4: 20,
    tempo: 120
};

const DspTripleDelayDefault: DspTripleDelay = {
    feedback: 0,
    frequency: 1000,
    tap1: 60,
    tap2: 40,
    tap3: 20,
    tempo: 120
};

const DspPlateDefault: DspPlate = {
    hiPassFrequency: 8000,
    lowPassFrequency: 250,
    size: 42
};

const DspCustomSpringDefault: DspCustomSpring = {
    hiPassFrequency: 8000,
    lowPassFrequency: 250,
    time: 100
};

const DspHallDefault: DspHall = {
    hiPassFrequency: 8000,
    lowPassFrequency: 250,
    preDelayTime: 20,
    reverbTime: 42
};

const DspFreeVerbDefault: DspFreeVerb = {
    hiPassFrequency: 6000,
    size: 42
};

export function createForDspType(type: DspType | undefined): RecursivePartial<EffectsEx> {
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