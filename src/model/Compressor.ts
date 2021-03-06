import { Percent } from "./Types";

export enum CompressorModelType {
    Limiter,
    VariMu,
    TubeGen,
}

export enum CompressorAttackTime {
    ms3,
    ms8,
    ms13,
    ms22,
    ms31,
    ms40,
    ms57,
    ms80
}

export enum CompressorReleaseTime {
    ms100,
    ms200,
    ms300,
    ms500,
    ms700,
    ms800,
    ms1000,
    ms1800
}

export interface Compressor {
    enabled: boolean;
    model: CompressorModelType;
    sensitivity: Percent;
    attack: CompressorAttackTime;
    release: CompressorReleaseTime;
    level: Percent;
}