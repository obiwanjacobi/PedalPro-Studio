import { Percent } from "./Types";

export enum DspType {
    MedHall,
    BigHall,
    Room,
    Church,
    Reverse,
    Gated,
    Chapel,
    Spring,
    // editable
    DoubleDelay,
    CaveDelay,
    SingleTap,
    FourTapsDelay,
    TripleDelay,
    Plate,
    CustomSpring,
    Hall,
    FreeVerb,
}

// 0-100 step 1
export type DspDelayLevel = number;

// -100 - +100 step 1
export type DspDelayFeedback = number;

// 98 - 20159 step = table
export type DspPassFrequency = number;

// -50 - +50 step 1 (+/-50 displayed as left/right resp.)
export type DspBalance = number;

// 0 - +100 step 1
export type DspPercent = number;

// 401 - 20159 step = table
export type DspFrequency = number;

// 72 - 326 step 1
export type DspTempo = number;

// 10-40 step 1
export type DoubleDelayDelay = number;

// 100-250 step 1
export type DoubleDelayDelay3 = number;

// 200-500 step 1
export type DoubleDelayDelay4 = number;

export interface DspDelay {
    level: DspDelayLevel;
    feedback: DspDelayFeedback;
}

export interface DspTwinMix {
    frequency1: DspPassFrequency;
    frequency2: DspPassFrequency;
    frequencyL: DspPassFrequency;
    frequencyR: DspPassFrequency;
    outL: DspBalance;
    outR: DspBalance;
}

export interface DoubleDelay extends DspDelay {
    delay: DoubleDelayDelay;
}
export interface DoubleDelay3 extends DspDelay {
    delay: DoubleDelayDelay3;
}
export interface DoubleDelay4 extends DspDelay {
    delay: DoubleDelayDelay4;
}

export interface DspDoubleDelay extends DspTwinMix {
    delay1: DoubleDelay;
    delay2: DoubleDelay;
    delay3: DoubleDelay3;
    delay4: DoubleDelay4;
}

// 10 - 80 step 1
export type CaveDelayDelay1 = number;

// 10 - 160 step 1
export type CaveDelayDelay2 = number;

// 50 - 240 step 1
export type CaveDelayDelay3 = number;

// 50 - 320 step 1
export type CaveDelayDelay4 = number;

export interface CaveDelay1 extends DspDelay {
    delay: CaveDelayDelay1;
}
export interface CaveDelay2 extends DspDelay {
    delay: CaveDelayDelay2;
}
export interface CaveDelay3 extends DspDelay {
    delay: CaveDelayDelay3;
}
export interface CaveDelay4 extends DspDelay {
    delay: CaveDelayDelay4;
}

export interface DspCaveDelay extends DspTwinMix {
    delay1: CaveDelay1;
    delay2: CaveDelay2;
    delay3: CaveDelay3;
    delay4: CaveDelay4;
}

export interface DspSingleTap {
    tempo: DspTempo;
    feedback: DspPercent;
    frequency: DspFrequency;
}

export interface DspFourTapsDelay {
    tempo: DspTempo;
    frequency: DspFrequency;
    feedback: DspPercent;
    tap1: DspPercent;
    tap2: DspPercent;
    tap3: DspPercent;
    tap4: DspPercent;
}

export interface DspTripleDelay {
    tempo: DspTempo;
    frequency: DspFrequency;
    feedback: DspPercent;
    tap1: DspPercent;
    tap2: DspPercent;
    tap3: DspPercent;
}

// 3 - 127 step 1
export type DspPlateSize = number;

export interface DspPlate {
    size: DspPlateSize;
    lowPassFrequency: DspPassFrequency;
    hiPassFrequency: DspPassFrequency;
}

// 50 - 127 step 1
export type DspReverbTime = number;

export interface DspCustomSpring {
    time: DspReverbTime;
    lowPassFrequency: DspPassFrequency;
    hiPassFrequency: DspPassFrequency;
}

// 20 - 100 step 1
export type DspDelayTime = number;

export interface DspHall {
    preDelayTime: DspDelayTime;
    reverbTime: DspDelayTime;
    lowPassFrequency: DspPassFrequency;
    hiPassFrequency: DspPassFrequency;
}

// 20 - 127 step 1
export type DspVerbSize = number;

export interface DspFreeVerb {
    size: DspVerbSize;
    hiPassFrequency: DspPassFrequency;
}

export interface Dsp {
    enabled: boolean;
    type: DspType;
    input: Percent;
    dry: Percent;
    wet: Percent;
    data?: string;

    // based on type
    doubleDelay?: DspDoubleDelay;
    caveDelay?: DspCaveDelay;
    singleTap?: DspSingleTap;
    fourTapsDelay?: DspFourTapsDelay;
    tripleDelay?: DspTripleDelay;
    plate?: DspPlate;
    customSpring?: DspCustomSpring;
    hall?: DspHall;
    freeVerb?: DspFreeVerb;
}