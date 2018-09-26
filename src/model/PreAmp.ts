import { Percent } from "./Types";

export enum PreAmpRouting {
    Clean,              // emphasis + equalizer
    DistortionDiode,    // emphasis + distortion-diode + equalizer
    DistortionFet,      // emphasis + distortion-fet + equalizer
    DistortionDiodeFet, // emphasis + distortion-diode + distortion-fet + equalizer
    Fuzz                // emphasis + fuzz + equalizer
}

// tslint:disable:no-bitwise

export class PreAmpRoutingValue {
    private readonly val: PreAmpRouting;

    public constructor(routing: PreAmpRouting) {
        this.val = routing;
    }

    public get value(): PreAmpRouting {
        return this.val;
    }

    public get distortionDiode(): boolean {
        return (this.val & PreAmpRouting.DistortionDiode) !== 0;
    }

    public setDistortionDiode(enabled: boolean): PreAmpRouting {
        let routing = this.val & ~(PreAmpRouting.DistortionDiode | PreAmpRouting.Fuzz);

        if (enabled) {
            routing = routing | PreAmpRouting.DistortionDiode;
        }

        return routing;
    }

    public get distortionFet(): boolean {
        return (this.val & PreAmpRouting.DistortionFet) !== 0;
    }

    public setDistortionFet(enabled: boolean): PreAmpRouting {
        let routing = this.val & ~(PreAmpRouting.DistortionFet | PreAmpRouting.Fuzz);

        if (enabled) {
            routing = routing | PreAmpRouting.DistortionFet;
        }

        return routing;
    }

    public get fuzz(): boolean {
        return (this.val & PreAmpRouting.Fuzz) !== 0;
    }

    public setFuzz(enabled: boolean): PreAmpRouting {
        let routing = this.val & ~(PreAmpRouting.DistortionDiodeFet | PreAmpRouting.Fuzz);

        if (enabled) {
            routing = routing | PreAmpRouting.Fuzz;
        }

        return routing;
    }
}

// 1000-2000 Hz step 4
export type EmphasisFrequency = number;

// -12 dB - +12 dB step is variable (see table)
export type AttenuationGain = number;

export const AttenuationGainValues: number[] = [
    -12.0, -11.0, -10.0, -9.0, -8.0,
    -7.5, -7.0, -6.5, -6.0, -5.5, -5.0, -4.5,
    -4.0, -3.8, -3.6, -3.4, -3.2, 
    -3.0, -2.8, -2.6, -2.4, -2.2, 
    -2.0, -1.8, -1.6, -1.4, -1.2,
    -1.0, -0.8, -0.6, -0.4, -0.2,
    0.0,
    0.2, 0.4, 0.6, 0.8, 1.0,
    1.2, 1.4, 1.6, 1.8, 2.0,
    2.2, 2.4, 2.6, 2.8, 3.0,
    3.2, 3.4, 3.6, 3.8, 4.0, 
    4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5,
    8.0, 9.0, 10.0, 11.0, 12.0
];

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

export const DistortionDiodeTypeValue: string[] = [
    "Guvnor",
    "Dumble Drive",
    "VR Distortion",
    "Full Drive",
    "Bright Distortion",
    "Vintage Drive",
    "MXR"
];

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