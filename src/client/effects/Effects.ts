import * as Model from "../../model/Effects";
import { Compressor } from "./compressor/Compressor";
import { Boost } from "./boost/Boost";
import { Distortion } from "./distortion/Distortion";
import { VoltageControlledAmp } from "./vca/VoltageControlledAmp";
import { Phaser } from "./phaser/Phaser";
import { Volume } from "./volume/Volume";
import { Filters } from "./filters/Filters";
import { Modulation } from "./modulation/Modulation";
import { Delay } from "./delay/Delay";
import { Aux } from "./auxRouting/AuxRouting";
import { PreAmp } from "./preamp/PreAmp";
import { Dsp } from "./dsp/Dsp";
import { NoiseGate } from "./noiseGate/NoiseGate";
import { TapTempo } from "./tap/TapTempo";
import { Midi } from "./midi/Midi";

export interface Effects extends Model.Effects {
    compressor: Compressor;
    boost: Boost;
    distortion: Distortion;
    vca: VoltageControlledAmp;
    phaser: Phaser;
    volume: Volume;
    filters: Filters;
    modulation: Modulation;
    delay: Delay;
    aux: Aux;
    noiseGate: NoiseGate;
    tap: TapTempo;
    midi: Midi;
}

export interface EffectsEx extends Model.EffectsEx {
    compressor: Compressor;
    boost: Boost;
    pre: PreAmp;
    vca: VoltageControlledAmp;
    phaser: Phaser;
    volume: Volume;
    filters: Filters;
    modulation: Modulation;
    delay: Delay;
    aux: Aux;
    dsp: Dsp;
    noiseGate: NoiseGate;
    tap: TapTempo;
    midi: Midi;
}

// same as property names on Effects and EffectsEx interfaces
// same as property names on Effects and EffectsEx interfaces
export enum EffectNames {
    None = "",
    AuxRouting = "aux",
    Boost = "boost",
    Compressor = "compressor",
    Delay = "delay",
    Distortion = "distortion",
    Dsp = "dsp",
    Filters = "filters",
    Midi = "midi",
    Modulation = "modulation",
    NoiseGate = "noiseGate",
    Phaser = "phaser",
    PreAmp = "pre",
    TapTempo = "tap",
    Vca = "vca",
    Volume = "volume",
}

export type EffectsOrEx = Effects | EffectsEx;

export type AnyEffect = 
    Aux | Boost | Compressor | Delay | Distortion | Dsp | Filters | 
    Midi | Modulation | NoiseGate | Phaser | PreAmp | TapTempo | 
    VoltageControlledAmp | Volume;
