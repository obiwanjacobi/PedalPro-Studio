import { Effects, EffectsEx, EffectNames, EffectsOrEx } from "./Effects";
import { EffectsBuilder } from "./EffectsBuilder";
import { EffectsExBuilder } from "./EffectsExBuilder";
import { createBuilder } from "./EffectsBuilderCommon";
import { EffectComponentName } from "./EffectsState";
import { RecursivePartial } from "../../TypeExtensions";
import { ModulationMode } from "../../model/Modulation";
import { FilterRouting } from "../../model/Filters";
import { DelayRouting } from "../../model/Delay";
import { AuxRouting } from "../../model/AuxRouting";

export function isEffectsEx(effects: EffectsOrEx): boolean {
    const ex = effects as EffectsEx;
    return !!ex.pre && !!ex.dsp;
}

export function isEffects(effects: EffectsOrEx): boolean {
    const eff = effects as Effects;
    return !!eff.distortion;
}

// function effectsEqual(
//     effects1: EffectsOrEx | undefined, 
//     effects2: EffectsOrEx | undefined): boolean {

//     if (!effects1 || !effects2) { return effects1 === effects2; }

//     if (isEffectsEx(effects1) === isEffectsEx(effects2)) {
//         return lodash.isEqual(effects1, effects2);
//     }
//     return false;
// }

function getFirstSelected(effectsOrEx: EffectsOrEx): EffectNames {
    if (isEffects(effectsOrEx)) {
        const effects = effectsOrEx as Effects;
        // if (effects.compressor.ui.selected) { return EffectNames.Compressor; }
        // if (effects.boost.ui.selected) { return EffectNames.Boost; }
        // if (effects.distortion.ui.selected) { return EffectNames.Distortion; }
        // if (effects.vca.ui.selected) { return EffectNames.Vca; }
        // if (effects.modulation.ui.selected) { return EffectNames.Modulation; }
        // if (effects.filters.ui.selected) { return EffectNames.Filters; }
        // if (effects.delay.ui.selected) { return EffectNames.Delay; }
        // if (effects.aux.ui.selected) { return EffectNames.AuxRouting; }
        // if (effects.phaser.ui.selected) { return EffectNames.Phaser; }
        // if (effects.volume.ui.selected) { return EffectNames.Volume; }
        // if (effects.noiseGate.ui.selected) { return EffectNames.NoiseGate; }

        if (effects.compressor.enabled) { return EffectNames.Compressor; }
        if (effects.boost.enabled) { return EffectNames.Boost; }
        if (effects.distortion.enabled) { return EffectNames.Distortion; }
        if (effects.vca.enabled) { return EffectNames.Vca; }
        if (effects.modulation.mode !== ModulationMode.None) { return EffectNames.Modulation; }
        if (effects.filters.routing !== FilterRouting.Bypass) { return EffectNames.Filters; }
        if (effects.delay.routing !== DelayRouting.None) { return EffectNames.Delay; }
        if (effects.aux.routing !== AuxRouting.None) { return EffectNames.AuxRouting; }
        if (effects.phaser.enabled) { return EffectNames.Phaser; }
        if (effects.volume.enabled) { return EffectNames.Volume; }
        if (effects.noiseGate.enabled) { return EffectNames.NoiseGate; }
    }

    if (isEffectsEx(effectsOrEx)) {
        const effectsEx = effectsOrEx as EffectsEx;
        // if (effectsEx.compressor.ui.selected) { return EffectNames.Compressor; }
        // if (effectsEx.boost.ui.selected) { return EffectNames.Boost; }
        // if (effectsEx.pre.ui.selected) { return EffectNames.PreAmp; }
        // if (effectsEx.vca.ui.selected) { return EffectNames.Vca; }
        // if (effectsEx.modulation.ui.selected) { return EffectNames.Modulation; }
        // if (effectsEx.filters.ui.selected) { return EffectNames.Filters; }
        // if (effectsEx.delay.ui.selected) { return EffectNames.Delay; }
        // if (effectsEx.dsp.ui.selected) { return EffectNames.Dsp; }
        // if (effectsEx.aux.ui.selected) { return EffectNames.AuxRouting; }
        // if (effectsEx.phaser.ui.selected) { return EffectNames.Phaser; }
        // if (effectsEx.volume.ui.selected) { return EffectNames.Volume; }
        // if (effectsEx.noiseGate.ui.selected) { return EffectNames.NoiseGate; }

        if (effectsEx.compressor.enabled) { return EffectNames.Compressor; }
        if (effectsEx.boost.enabled) { return EffectNames.Boost; }
        if (effectsEx.pre.enabled) { return EffectNames.PreAmp; }
        if (effectsEx.vca.enabled) { return EffectNames.Vca; }
        if (effectsEx.modulation.mode !== ModulationMode.None) { return EffectNames.Modulation; }
        if (effectsEx.filters.routing !== FilterRouting.Bypass) { return EffectNames.Filters; }
        if (effectsEx.delay.routing !== DelayRouting.None) { return EffectNames.Delay; }
        if (effectsEx.dsp.enabled) { return EffectNames.Dsp; }
        if (effectsEx.aux.routing !== AuxRouting.None) { return EffectNames.AuxRouting; }
        if (effectsEx.phaser.enabled) { return EffectNames.Phaser; }
        if (effectsEx.volume.enabled) { return EffectNames.Volume; }
        if (effectsEx.noiseGate.enabled) { return EffectNames.NoiseGate; }
    }

    return EffectNames.None;
}

export function determineSelectedEffect(
    effectsOrEx: EffectsOrEx, effectName: EffectNames, componentName?: string): EffectComponentName {

    if (effectName === EffectNames.None) {
        return { effectName: getFirstSelected(effectsOrEx) };
    }

    return { effectName: effectName, componentName: componentName };
}

export function selectEffect(effectsOrEx: EffectsOrEx, select: EffectNames, deselect: EffectNames): EffectsOrEx {
    const builder = createBuilder(effectsOrEx);
    if (deselect !== EffectNames.None) {
        builder.changeUIByName(deselect, { selected: false });
    }
    if (select !== EffectNames.None) {
        builder.changeUIByName(select, { selected: true });
    }
    return builder.detach();
}

export function mergeEffects(source: Effects, ...merges: RecursivePartial<Effects>[]): Effects {
    const builder = new EffectsBuilder(source);
    merges.forEach(m => builder.merge(m));
    return builder.detach();
}

export function mergeEffectsEx(source: EffectsEx, ...merges: RecursivePartial<EffectsEx>[]): EffectsEx {
    const builder = new EffectsExBuilder(source);
    merges.forEach(m => builder.merge(m));
    return builder.detach();
}
