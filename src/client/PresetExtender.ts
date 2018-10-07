import { PresetCollectionType } from "./ApplicationDocument";
import { ItemUI } from "./ItemUI";
import { asEffects, asEffectsEx } from "./effects/EffectsOperations";

import { Preset as ModelPreset } from "../model/Preset";
import { Effects as ModelEffects, EffectsEx as ModelEffectsEx } from "../model/Effects";
import { Aux as ModelAux } from "../model/AuxRouting";
import { Boost as ModelBoost } from "../model/Boost";
import { Compressor as ModelCompressor } from "../model/Compressor";
import { Delay as ModelDelay } from "../model/Delay";
import { Distortion as ModelDistortion } from "../model/Distortion";
import { Dsp as ModelDsp } from "../model/Dsp";
import { Filters as ModelFilters } from "../model/Filters";
import { Midi as ModelMidi } from "../model/Midi";
import { Modulation as ModelModulation } from "../model/Modulation";
import { NoiseGate as ModelNoiseGate } from "../model/NoiseGate";
import { Phaser as ModelPhaser } from "../model/Phaser";
import { PreAmp as ModelPreAmp } from "../model/PreAmp";
import { TapTempo as ModelTapTempo } from "../model/TapTempo";
import { VoltageControlledAmp as ModelVoltageControlledAmp } from "../model/VoltageControlledAmp";
import { Volume as ModelVolume } from "../model/Volume";

import { Preset } from "./preset/Preset";
import { EffectsOrEx } from "./effects/Effects";
import { Aux } from "./effects/auxRouting/AuxRouting";
import { Boost } from "./effects/boost/Boost";
import { Compressor } from "./effects/compressor/Compressor";
import { Delay } from "./effects/delay/Delay";
import { Distortion } from "./effects/distortion/Distortion";
import { Dsp } from "./effects/dsp/Dsp";
import { Filters } from "./effects/filters/Filters";
import { Midi } from "./effects/midi/Midi";
import { Modulation } from "./effects/modulation/Modulation";
import { NoiseGate } from "./effects/noiseGate/NoiseGate";
import { Phaser } from "./effects/phaser/Phaser";
import { PreAmp } from "./effects/preamp/PreAmp";
import { TapTempo } from "./effects/tap/TapTempo";
import { VoltageControlledAmp } from "./effects/vca/VoltageControlledAmp";
import { Volume } from "./effects/volume/Volume";

function newItemUI(): ItemUI {
    return { expanded: false, selected: false, markedDeleted: false };
}

function extendAux(effect: ModelAux): Aux {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendBoost(effect: ModelBoost): Boost {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendCompressor(effect: ModelCompressor): Compressor {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendDelay(effect: ModelDelay): Delay {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendDistortion(effect: ModelDistortion): Distortion {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendDsp(effect: ModelDsp): Dsp {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendFilters(effect: ModelFilters): Filters {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendMidi(effect: ModelMidi): Midi {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendModulation(effect: ModelModulation): Modulation {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendNoiseGate(effect: ModelNoiseGate): NoiseGate {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendPhaser(effect: ModelPhaser): Phaser {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendPreAmp(effect: ModelPreAmp): PreAmp {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendTapTempo(effect: ModelTapTempo): TapTempo {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendVca(effect: ModelVoltageControlledAmp): VoltageControlledAmp {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendVolume(effect: ModelVolume): Volume {
    return { ...effect, origin: effect, ui: newItemUI() };
}

function extendEffects(effectsOrEx?: ModelEffects | ModelEffectsEx): EffectsOrEx {
    if (!effectsOrEx) { throw new Error("Effects were not set."); }

    const effectsEx = asEffectsEx(effectsOrEx);
    if (effectsEx) {
        return {
            aux: extendAux(effectsEx.aux),
            boost: extendBoost(effectsEx.boost),
            compressor: extendCompressor(effectsEx.compressor),
            delay: extendDelay(effectsEx.delay),
            dsp: extendDsp(effectsEx.dsp),
            filters: extendFilters(effectsEx.filters),
            midi: extendMidi(effectsEx.midi),
            modulation: extendModulation(effectsEx.modulation),
            noiseGate: extendNoiseGate(effectsEx.noiseGate),
            phaser: extendPhaser(effectsEx.phaser),
            pre: extendPreAmp(effectsEx.pre),
            tap: extendTapTempo(effectsEx.tap),
            vca: extendVca(effectsEx.vca),
            volume: extendVolume(effectsEx.volume)
        };
    }

    const effects = asEffects(effectsOrEx);
    if (effects) {
        return {
            aux: extendAux(effects.aux),
            boost: extendBoost(effects.boost),
            compressor: extendCompressor(effects.compressor),
            delay: extendDelay(effects.delay),
            distortion: extendDistortion(effects.distortion),
            filters: extendFilters(effects.filters),
            midi: extendMidi(effects.midi),
            modulation: extendModulation(effects.modulation),
            noiseGate: extendNoiseGate(effects.noiseGate),
            phaser: extendPhaser(effects.phaser),
            tap: extendTapTempo(effects.tap),
            vca: extendVca(effects.vca),
            volume: extendVolume(effects.volume)
        };
    }

    throw new Error("Effects type not determined.");
}

export function extendPreset(preset: ModelPreset, collection: PresetCollectionType): Preset {
    return {
        ...preset, 
        effects: extendEffects(preset.effects),
        origin: preset,
        source: collection,
        ui: newItemUI()
    };
}
