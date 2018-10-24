import * as Lodash from "lodash";

import * as Model from "../../model/Effects";
import { Effects, EffectsEx, EffectNames, EffectsOrEx, AnyEffect } from "./Effects";
import { EffectsBuilder } from "./EffectsBuilder";
import { EffectComponentName } from "./EffectsState";
import { RecursivePartial } from "../../TypeExtensions";
import { ModulationMode } from "../../model/Modulation";
import { FilterRouting } from "../../model/Filters";
import { DelayRouting } from "../../model/Delay";
import { AuxRouting } from "../../model/AuxRouting";
import { isObject } from "../../TypeExtensions";

export function isEffectsEx(effects: Model.Effects | Model.EffectsEx): boolean {
    const ex = effects as Model.EffectsEx;
    return !!ex.pre && !!ex.dsp;
}

export function isEffects(effects: Model.Effects | Model.EffectsEx): boolean {
    const eff = effects as Model.Effects;
    return !!eff.distortion;
}

export function asEffects(effectsOrEx: Model.Effects | Model.EffectsEx): Model.Effects | undefined {
    return isEffects(effectsOrEx) ? <Model.Effects> effectsOrEx : undefined;
}

export function asEffectsEx(effectsOrEx: Model.Effects | Model.EffectsEx): Model.EffectsEx | undefined {
    return isEffectsEx(effectsOrEx) ? <Model.EffectsEx> effectsOrEx : undefined;
}

// https://github.com/lodash/lodash/issues/72
// tslint:disable-next-line:no-any
function commonIsEqual(obj1: any, obj2: any): boolean {
    const keys = Lodash.intersection(Object.keys(obj1), Object.keys(obj2));
    let equal = false;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const prop1 = obj1[key];
        const prop2 = obj2[key];

        if (isObject(prop1) && isObject(prop2)) {
            equal = commonIsEqual(prop1, prop2);
        } else {
            equal = Lodash.isEqual(prop1, prop2);
        }

        if (!equal) { break; }
    }
    return equal;
}
export function effectsEqual(
    effects1: Model.Effects | Model.EffectsEx | undefined,
    effects2: Model.Effects | Model.EffectsEx | undefined): boolean {

    if (!effects1 || !effects2) { return effects1 === effects2; }
    if (effects1 === effects2) { return true; }

    if (isEffectsEx(effects1) === isEffectsEx(effects2)) {
        return commonIsEqual(effects1, effects2);
    }

    return false;
}

export function effectEqual(effect1: AnyEffect, effect2: AnyEffect): boolean {
    if (effect1 === effect2) { return true; }
    return commonIsEqual(effect1, effect2);
}

function getFirstSelected(effectsOrEx: EffectsOrEx): EffectNames {
    if (isEffects(effectsOrEx)) {
        const effects = effectsOrEx as Effects;
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
    effectsOrEx: EffectsOrEx, effectName: EffectNames = EffectNames.None, componentName?: string): EffectComponentName {

    if (effectName === EffectNames.None) {
        return { effectName: getFirstSelected(effectsOrEx) };
    }

    return { effectName: effectName, componentName: componentName };
}

export function selectEffect(
    effectsOrEx: EffectsOrEx, select: EffectNames, deselect: EffectNames = EffectNames.None): EffectsOrEx {

    const builder = new EffectsBuilder(effectsOrEx);
    if (deselect !== EffectNames.None) {
        builder.changeUIByName(deselect, { selected: false });
    }
    if (select !== EffectNames.None) {
        builder.changeUIByName(select, { selected: true });
    }
    return builder.detach();
}

export function mergeEffects(source: EffectsOrEx, ...merges: RecursivePartial<EffectsOrEx>[]): EffectsOrEx {
    const builder = new EffectsBuilder(source);
    merges.forEach(m => builder.merge(m));
    return builder.detach();
}

export function compareEffects(source: EffectsOrEx, to: EffectsOrEx): boolean {
    return Lodash.isEqual(source, to);
}

// tslint:disable-next-line:no-any
function conditionalCloneHandler(value: any, key: any): any {

    switch (key) {
        case "origin":
            // do not clone original
            return value;

        case "ui":
            // provide fresh clean copy
            return { selected: false, expanded: false, markedDeleted: false };

        default:
            // let lodash handle cloning
            return undefined;
    }
}

export function makeWorkingCopy(effectsOrEx: EffectsOrEx): EffectsOrEx {
    return Lodash.cloneDeepWith(effectsOrEx, conditionalCloneHandler);
}

export function effectHasChanged(effect: AnyEffect): boolean {
    return !commonIsEqual(effect, effect.origin);
}
export function hasChanged(effectsOrEx: EffectsOrEx): boolean {
    if (effectHasChanged(effectsOrEx.aux)) { return true; }
    if (effectHasChanged(effectsOrEx.boost)) { return true; }
    if (effectHasChanged(effectsOrEx.compressor)) { return true; }
    if (effectHasChanged(effectsOrEx.delay)) { return true; }
    if (effectHasChanged(effectsOrEx.filters)) { return true; }
    if (effectHasChanged(effectsOrEx.midi)) { return true; }
    if (effectHasChanged(effectsOrEx.modulation)) { return true; }
    if (effectHasChanged(effectsOrEx.noiseGate)) { return true; }
    if (effectHasChanged(effectsOrEx.phaser)) { return true; }
    if (effectHasChanged(effectsOrEx.tap)) { return true; }
    if (effectHasChanged(effectsOrEx.vca)) { return true; }
    if (effectHasChanged(effectsOrEx.volume)) { return true; }

    const effects = asEffects(effectsOrEx) as Effects;
    if (effects) {
        if (effectHasChanged(effects.distortion)) { return true; }
    }

    const effectsEx = asEffectsEx(effectsOrEx) as EffectsEx;
    if (effectsEx) {
        if (effectHasChanged(effectsEx.pre)) { return true; }
        if (effectHasChanged(effectsEx.dsp)) { return true; }
    }

    return false;
}