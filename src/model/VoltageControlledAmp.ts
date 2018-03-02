import { PhaseShift, WaveForm, TempoSpeed, Percent } from "./Types";

export enum VcaAssign {
    Tremolo,
    Panner,
    Expression
}

export default interface VoltageControlledAmp {
    enabled: boolean;
    assign: VcaAssign;
    tempo: TempoSpeed;
    wave: WaveForm;
    depth: Percent;
    phase: PhaseShift;
}