import { Effects, EffectsEx } from "./Effects";
import PresetTraits from "./PresetTraits";

export default interface Preset {
    /**
     * The index or position of this preset in the collection (order).
     */
    index: number;

    /**
     * The name of the preset - does not have to be unique.
     */
    name: string;

    /**
     * Raw data
     */
    data?: string;

    /**
     * Specific traits of the preset
     */
    traits: PresetTraits;

    /**
     * Effects of the preset
     */
    effects?: Effects | EffectsEx;
}