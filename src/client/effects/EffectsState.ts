import { Preset } from "../preset/Preset";
import { Effects, EffectsEx, EffectNames } from "./Effects";

export type EffectComponentName = {
    /**
     * Same name as the Effects(Ex) property names (compressor, boost etc)
     */
    effectName: EffectNames;
    /**
     * A component name within the effect.
     */
    componentName?: string;
};

export interface EffectState {
    /**
     * The Preset being edited.
     */
    preset: Preset;

    /**
     * A copy of the preset.effects.
     */
    effects: Effects | EffectsEx;

    selected: EffectComponentName;
}