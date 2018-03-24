import { PhaseShift, WaveForm, TempoSpeed, Percent } from "./Types";

export enum VcaAssign {
    Tremolo,
    Panner,
    VolumeExpression,
    PannerExpression
}

export interface VoltageControlledAmp {
    enabled: boolean;
    assign: VcaAssign;
    tempo: TempoSpeed;
    wave: WaveForm;
    depth: Percent;
    phase: PhaseShift;
}