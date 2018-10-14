import { Effects, EffectsEx } from "./Effects";
import { PresetTraits } from "./PresetTraits";
import { PresetMeta } from "./PresetMeta";

// PedalPro => 0 - 500
// PedalProEx => 0 - 400
export type PresetIndex = number;

export interface Preset {
    /**
     * Metadata about the preset.
     */
    meta: PresetMeta;

    /**
     * The index or position of this preset in the collection (order).
     */
    index: PresetIndex;

    /**
     * The name of the preset - does not have to be unique.
     */
    name: string;

    /**
     * Specific traits of the preset
     */
    traits: PresetTraits;

    /**
     * Effects of the preset
     */
    effects?: Effects | EffectsEx;
}