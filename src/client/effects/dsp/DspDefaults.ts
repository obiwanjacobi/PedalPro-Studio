import { 
    DoubleDelay, DoubleDelay3, DoubleDelay4, 
    DspDoubleDelay, DspSingleTap, DspFourTapsDelay, 
    DspCaveDelay, DspTripleDelay, DspPlate, DspHall, DspFreeVerb, 
    CaveDelay1, CaveDelay2, CaveDelay3, CaveDelay4, DspCustomSpring 
} from "../../../model/Dsp";

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

export const DspDoubleDelayDefault: DspDoubleDelay = {
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

export const DspCaveDelayDefault: DspCaveDelay = {
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

export const DspSingleTapDefault: DspSingleTap = {
    feedback: 0,
    lowPassFrequency: 100,
    tempo: 120
};

export const DspFourTapsDefault: DspFourTapsDelay = {
    feedback: 0,
    frequency: 1000,
    tap1: 60,
    tap2: 40,
    tap3: 30,
    tap4: 20,
    tempo: 120
};

export const DspTripleDelayDefault: DspTripleDelay = {
    feedback: 0,
    frequency: 1000,
    tap1: 60,
    tap2: 40,
    tap3: 20,
    tempo: 120
};

export const DspPlateDefault: DspPlate = {
    hiPassFrequency: 8000,
    lowPassFrequency: 250,
    size: 42
};

export const DspCustomSpringDefault: DspCustomSpring = {
    hiPassFrequency: 8000,
    lowPassFrequency: 250,
    time: 100
};

export const DspHallDefault: DspHall = {
    hiPassFrequency: 8000,
    lowPassFrequency: 250,
    preDelayTime: 20,
    reverbTime: 42
};

export const DspFreeVerbDefault: DspFreeVerb = {
    hiPassFrequency: 6000,
    size: 42
};