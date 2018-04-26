import * as lodash from "lodash";

import { PresetCollectionType } from "./ApplicationDocument";
import { ItemUI } from "./ItemUI";
import * as ModelPreset from "../model/Preset";
import { PresetTraits } from "../model/PresetTraits";
import { Effects, EffectsEx } from "../model/Effects";
import { PresetMeta } from "../model/PresetMeta";

export interface PresetGroup {
    /**
     * the name of the group
     */
    name: string;
}

// ui extensions
export interface Preset extends ModelPreset.Preset {
    
    /**
     * current source of the preset
     */
    source: PresetCollectionType;
    
    /**
     * UI related preset settings
     */
    ui: ItemUI;

    /**
     * If set, marks this preset as part of a specific grouping
     */
    group?: PresetGroup;

    /**
     * the origin of this preset
     */
    origin: ModelPreset.Preset;
}

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

function presetsExceptIndexEqual(preset1: ModelPreset.Preset, preset2: ModelPreset.Preset): boolean {
    return lodash.isEqual(preset1.name, preset2.name) &&
           metaEqual(preset1.meta, preset2.meta) &&
           traitsEqual(preset1.traits, preset2.traits) &&
           effectsEqual(preset1.effects, preset2.effects);
}

export function onlyIndexHasChanged(preset: Preset): boolean {
    if (!preset.origin) { return false; }
    return preset.origin.index !== preset.index &&
           presetsExceptIndexEqual(preset, preset.origin);
}

export function presetHasChanged(preset: Preset): boolean {
    if (!preset.origin) { return false; }
    return preset.origin.index !== preset.index ||
           !presetsExceptIndexEqual(preset, preset.origin);
}

export function formatPresetIndex(preset: Preset): string {
    const value = preset.index;
    // formats 3 digits with leading zeros
    return (String(0).repeat(3) + String(value)).slice(String(value).length);
}

export function presetsExceptUiAreEqual(preset1: Preset, preset2: Preset): boolean {
    return preset1.index === preset2.index &&
        preset1.source === preset2.source &&
        presetsExceptIndexEqual(preset1, preset2);
}