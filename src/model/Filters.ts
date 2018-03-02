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
    Trapeziodal,
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
    startFrequency: Frequency1;
    sensitivity: Percent;
    function: EnvelopeFunction;
}

export interface EqFilter1 {
    enhancedFrequency: Frequency1;
    resonance: ResonanceFilter1;
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
    startFrequency: Frequency2;
    sensitivity: Percent;
    function: EnvelopeFunction;
}

export interface EqFilter2 {
    enhancedFrequency: Frequency2;
    resonance: ResonanceFilter2;
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
    PostF2,
    PostF1F2,
    PreF1,
    PreF2,
    PreF1F2,
    PreF1PostF2R,
    PostF2R
}

export default interface Filters {
    routing: FilterRouting;

    // global option auto filter mode
    autoHumanSync: boolean;

    filter1: Filter1;
    filter2: Filter2;
}
