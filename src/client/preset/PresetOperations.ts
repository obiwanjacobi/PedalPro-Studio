import * as lodash from "lodash";

import { numberToString } from "../../StringExtensions";
import * as ModelPreset from "../../model/Preset";
import { PresetTraits } from "../../model/PresetTraits";
import { Effects, EffectsEx } from "../../model/Effects";
import { PresetMeta } from "../../model/PresetMeta";
import { Preset } from "./Preset";

function traitsEqual(traits1: PresetTraits, traits2: PresetTraits): boolean {
    return lodash.isEqual(traits1, traits2);
}

function metaEqual(meta1: PresetMeta, meta2: PresetMeta): boolean {
    return lodash.isEqual(meta1, meta2);
}

function isEffectsEx(effects: Effects | EffectsEx): boolean {
    const ex = effects as EffectsEx;
    if (ex.pre && ex.dsp) { return true; }
    return false;
}

function effectsEqual(
    effects1: Effects | EffectsEx | undefined, 
    effects2: Effects | EffectsEx | undefined): boolean {

    if (!effects1 || !effects2) { return effects1 === effects2; }

    if (isEffectsEx(effects1) === isEffectsEx(effects2)) {
        return lodash.isEqual(effects1, effects2);
    }
    return false;
}

function presetGroupAreEqual(preset1: Preset, preset2: Preset): boolean {
    if (preset1.group && preset2.group) {
        return preset1.group.name === preset2.group.name;
    }
    return preset1.group === preset2.group;
}

function presetGroupHasChanged(preset: Preset): boolean {
    if (preset.group) {
        return preset.group.name !== preset.group.originName;
    }
    return false;
}

export function formatPresetIndex(preset: ModelPreset.Preset): string {
    const value = preset.index;
    // formats 3 digits with leading zeros
    return numberToString(value, 3);
}

export function formatPresetFullName(preset: ModelPreset.Preset): string {
    // formats 3 digits with leading zeros
    return `${numberToString(preset.index, 3)} - ${preset.name}`;
}

export function presetsExceptIndexAreEqual(preset1: ModelPreset.Preset, preset2: ModelPreset.Preset): boolean {
    return lodash.isEqual(preset1.name, preset2.name) &&
           metaEqual(preset1.meta, preset2.meta) &&
           traitsEqual(preset1.traits, preset2.traits) &&
           effectsEqual(preset1.effects, preset2.effects);
}

export function onlyIndexHasChanged(preset: Preset): boolean {
    if (!preset.origin) { return false; }
    return (preset.origin.index !== preset.index ||
           presetGroupHasChanged(preset)) &&
           presetsExceptIndexAreEqual(preset, preset.origin);
}

export function presetHasChanged(preset: Preset): boolean {
    if (!preset.origin) { return false; }
    return preset.origin.index !== preset.index ||
           presetGroupHasChanged(preset) ||
           !presetsExceptIndexAreEqual(preset, preset.origin);
}

export function presetsAreEqual(preset1: Preset, preset2: Preset): boolean {
    return preset1.index === preset2.index &&
        preset1.source === preset2.source &&
        presetGroupAreEqual(preset1, preset2) &&
        presetsExceptIndexAreEqual(preset1, preset2);
}