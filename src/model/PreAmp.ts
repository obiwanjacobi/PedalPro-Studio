import { Percent } from "./Types";

export enum PreAmpRouting {
    Clean,              // emphasis + equalizer
    DistortionDiode,    // emphasis + distortion-diode + equalizer
    DistortionFet,      // emphasis + distortion-fet + equalizer
    DistortionDiodeFet, // emphasis + distortion-diode + distortion-fet + equalizer
    Fuzz                // emphasis + fuzz + equalizer
}

// 1000-2000 Hz step?
export type EmphasisFrequency = number;
// -12 dB - +12 dB step ?
export type AttenuationGain = number;

export enum EmphasisResonance {
    Low,
    MidLow,
    MidHigh,
    High
}

export interface PreEmphasis {
    boost: boolean;
    low: Percent;
    high: Percent;
    frequency: EmphasisFrequency;
    resonance: EmphasisResonance;
    gain: AttenuationGain;
    level: Percent;
}

export enum DistortionDiodeType {
    Guvnor,
    DumbleDrive,
    VrDistortion1,
    FullDrive,
    BrightDistortion,
    VintageDrive,
    Mxr
}

export interface PreDistortionDiode {
    type: DistortionDiodeType;
    low: Percent;
    mid: Percent;
    high: Percent;
    level: Percent;
}

export interface PreDistortionFet {
    contour: Percent;
    level: Percent;
}

export interface PreFuzz {
    boost: boolean;
    level: Percent;
}

export interface PreEqualizer {
    band60Hz: AttenuationGain;
    band125Hz: AttenuationGain;
    band250Hz: AttenuationGain;
    band500Hz: AttenuationGain;
    band1000Hz: AttenuationGain;
    band2000Hz: AttenuationGain;
    band4000Hz: AttenuationGain;
    band8000Hz: AttenuationGain;
}

export interface PreAmp {
    enabled: boolean;
    routing: PreAmpRouting; // distortion/fuzz

    emphasis: PreEmphasis;
    distortionDiode: PreDistortionDiode;
    distortionFet: PreDistortionFet;
    fuzz: PreFuzz;
    equalizer: PreEqualizer;
}