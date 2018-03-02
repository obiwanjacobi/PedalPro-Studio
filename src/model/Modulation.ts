import { TempoSpeed, Percent, PhaseShift } from "./Types";

export enum ModulationMode {
    None,
    Chorus,
    ChorusVibe,
    Flanger
}

export enum ModulatingWaveForm {
    Sine,
    Triangle,
    Trapeziodal,
    Rectangle,
    Exponential,
    Shelf1,
    Shelf2
}

export enum Harmonics {
    Odd,
    Even
}

export interface Chorus {
    bright: boolean;
    tempo: TempoSpeed;
    level: Percent;
    depth: Percent;
    phase: PhaseShift;
    wave: ModulatingWaveForm;
    wet: Percent;
}

export interface Vibe {
    boost: boolean;
    tempo: TempoSpeed;
    depth: Percent;
    phase: PhaseShift;
    wave: ModulatingWaveForm;
}

export interface Flanger {
    harmonics: Harmonics;
    tempo: TempoSpeed;
    feedback: Percent;
    depth: Percent;
    wave: ModulatingWaveForm;
    delay: Percent;
    wet: Percent;
}

export default interface Modulation {
    mode: ModulationMode;

    chorus: Chorus;
    vibe: Vibe;
    flanger: Flanger;
}