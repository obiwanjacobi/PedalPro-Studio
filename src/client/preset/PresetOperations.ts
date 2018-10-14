import * as lodash from "lodash";

import { numberToString } from "../../StringExtensions";
import { Preset as ModelPreset, PresetIndex } from "../../model/Preset";
import { PresetTraits } from "../../model/PresetTraits";
import { PresetMeta } from "../../model/PresetMeta";
import { Preset } from "./Preset";
import { effectsEqual } from "../effects/EffectsOperations";

function traitsEqual(traits1: PresetTraits, traits2: PresetTraits): boolean {
    return lodash.isEqual(traits1, traits2);
}

function metaEqual(meta1: PresetMeta, meta2: PresetMeta): boolean {
    return lodash.isEqual(meta1, meta2);
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

export function formatPresetIndex(preset: ModelPreset): string {
    const value = preset.index;
    if (value < 0) { return "---"; }
    // formats 3 digits with leading zeros
    return numberToString(value, 3);
}

export function formatPresetFullName(preset: ModelPreset): string {
    const value = preset.index;
    if (value < 0) { return preset.name; }
    // formats 3 digits with leading zeros
    return `${numberToString(preset.index, 3)} - ${preset.name}`;
}

export function presetsExceptIndexAreEqual(preset1: ModelPreset, preset2: ModelPreset): boolean {
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

export function presetsHaveChanged(presets: Preset[]): boolean {
    return presets.some(presetHasChanged);
}

export function presetsAreEqual(preset1: Preset, preset2: Preset): boolean {
    return preset1.index === preset2.index &&
        preset1.source === preset2.source &&
        presetGroupAreEqual(preset1, preset2) &&
        presetsExceptIndexAreEqual(preset1, preset2);
}

export function minPresetIndex(presets: Preset[]): PresetIndex {
    return presets.map(p => p.index).reduce((i1, i2) => Math.min(i1, i2));
}

export function maxPresetIndex(presets: Preset[]): PresetIndex {
    return presets.map(p => p.index).reduce((i1, i2) => Math.max(i1, i2));
}
