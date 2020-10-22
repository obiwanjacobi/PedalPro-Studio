import { TempoSpeed, PhaseShift, Percent } from "./Types";

// 1.0 - 18.0 step 0.5
export type ResonanceFilter1 = number;

// 1.0 - 16.0 step 0.5
export type ResonanceFilter2 = number;

// 370 Hz - 1968 Hz step +/- 1~2
export type Frequency1 = number;

// 150 Hz - 2697 Hz step +/- 2~3
// v7.1: 167 HZ - Hz step +/- 2~3 (always 5 in 2 steps)
export type Frequency2 = number;

// 370 Hz - 2697 Hz step +/- 2~3
// v7.1: 167 HZ - Hz step +/- 2~3 (always 5 in 2 steps)
export type MaxFrequency2 = number;

export enum Filter2Type {
    LowPass,
    BandPass
}

export enum FilterMode {
    Auto,
    Equalizer,
    EnvelopePos,
    EnvelopeNeg
}

export enum FilterWaveForm {
    Sine,
    Triangle,
    Trapezoidal,
    Rectangle,
    Exponential,
    Shelf1,
    Shelf2,
    Shelf3
}

export enum EnvelopeFunction {
    Linear,
    ExponentialPos,
    ExponentialNeg
}

export interface AutoFilter1 {
    wave: FilterWaveForm;
    tempo: TempoSpeed;
    phase: PhaseShift;

    // min <= max
    minFrequency: Frequency1;
    maxFrequency: Frequency1;
}

export interface EnvelopeFilter1 {
    frequency: Frequency1;
    sensitivity: Percent;
    function: EnvelopeFunction;
}

export interface EqFilter1 {
    frequency: Frequency1;
}

export interface Filter1 {
    resonance: ResonanceFilter1;
    mode: FilterMode;

    auto: AutoFilter1;
    envelope: EnvelopeFilter1;
    eq: EqFilter1;
}

export interface AutoFilter2 {
    wave: FilterWaveForm;
    tempo: TempoSpeed;
    phase: PhaseShift;

    // min <= max
    minFrequency: Frequency2;
    maxFrequency: MaxFrequency2;
}

export interface EnvelopeFilter2 {
    frequency: Frequency2;
    sensitivity: Percent;
    function: EnvelopeFunction;
}

export interface EqFilter2 {
    frequency: Frequency2;
}

export interface Filter2 {
    type: Filter2Type;
    
    resonance: ResonanceFilter2;
    mode: FilterMode;

    auto: AutoFilter2;
    envelope: EnvelopeFilter2;
    eq: EqFilter2;
}

export enum FilterRouting {
    Bypass,
    PostF1L,
    Stereo,
    PostF2L,
    PostF1F2L,
    PreF1,
    PreF2,
    PreF1F2,
    PreF1PostF2R,
    PostF2R
}

// tslint:disable:no-bitwise

export class FilterRoutingValue {

    private readonly val: FilterRouting;
    public constructor(routing: FilterRouting) {
        this.val = routing;
    }

    public get value(): FilterRouting {
        return this.val;
    }

    public get preFilter1(): boolean {
        return (this.val === FilterRouting.PreF1 ||
            this.val === FilterRouting.PreF1F2 ||
            this.val === FilterRouting.PreF1PostF2R);
    }

    public setPreFilter1(enabled: boolean): FilterRouting {
        if (enabled) {
            if (this.preFilter2) {
                return FilterRouting.PreF1F2;
            }
            if (this.postFilter2Right) {
                return FilterRouting.PreF1PostF2R;
            }
            return FilterRouting.PreF1;
        } else {
            if (this.preFilter2) {
                return FilterRouting.PreF2;
            }
            if (this.postFilter2Right) {
                return FilterRouting.PostF2R;
            }
            return FilterRouting.Bypass;
        }
    }

    public get preFilter2(): boolean {
        return (this.val === FilterRouting.PreF2 || 
            this.val  === FilterRouting.PreF1F2);
    }

    public setPreFilter2(enabled: boolean): FilterRouting {
        if (enabled) {
            if (this.preFilter1) {
                return FilterRouting.PreF1F2;
            }
            return FilterRouting.PreF2;
        } else {
            if (this.preFilter1) {
                return FilterRouting.PreF1;
            }
            if (this.postFilter1Left) {
                return FilterRouting.PostF1L;
            }
            return FilterRouting.Bypass;
        }
    }

    public get postFilter1Left(): boolean {
        return (this.val === FilterRouting.PostF1L ||
            this.val === FilterRouting.PostF1F2L ||
            this.val === FilterRouting.Stereo);
    }

    public setPostFilter1Left(enabled: boolean): FilterRouting {
        if (enabled) {
            if (this.postFilter2Right) {
                return FilterRouting.Stereo;
            }
            if (this.postFilter2Left) {
                return FilterRouting.PostF1F2L;
            }
            return FilterRouting.PostF1L;
        } else {
            if (this.preFilter2) {
                return FilterRouting.PreF2;
            }
            if (this.val === FilterRouting.Stereo) {
                return FilterRouting.PostF2R;
            }
            if (this.val === FilterRouting.PostF1F2L) {
                return FilterRouting.PostF2L;
            }
            return FilterRouting.Bypass;
        }
    }

    public get postFilter2Right(): boolean {
        return (this.val === FilterRouting.PostF2R ||
            this.val === FilterRouting.PreF1PostF2R ||
            this.val === FilterRouting.Stereo);
    }

    public setPostFilter2Right(enabled: boolean): FilterRouting {
        if (enabled) {
            if (this.preFilter1) {
                return FilterRouting.PreF1PostF2R;
            }
            if (this.postFilter1Left) {
                return FilterRouting.Stereo;
            }
            return FilterRouting.PostF2R;
        } else {
            if (this.preFilter1) {
                return FilterRouting.PreF1;
            }
            if (this.postFilter1Left) {
                return FilterRouting.PostF1L;
            }
            return FilterRouting.Bypass;
        }
    }

    public get postFilter2Left(): boolean {
        return (this.val === FilterRouting.PostF2L ||
            this.val === FilterRouting.PostF1F2L);
    }

    public setPostFilter2Left(enabled: boolean): FilterRouting {
        if (enabled) {
            if (this.postFilter1Left) {
                return FilterRouting.PostF1F2L;
            }
            return FilterRouting.PostF2L;
        } else {
            if (this.preFilter1) {
                return FilterRouting.PreF1;
            }
            if (this.postFilter1Left) {
                return FilterRouting.PostF1L;
            }
            return FilterRouting.Bypass;
        }
    }
}

export interface Filters {
    routing: FilterRouting;

    // global option auto filter mode
    autoHumanSync: boolean;

    filter1: Filter1;
    filter2: Filter2;
}
