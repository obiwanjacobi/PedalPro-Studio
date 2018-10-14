import { Preset } from "../preset/Preset";
import { EffectNames, EffectsOrEx } from "./Effects";

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
     * Indicates if the editor can write.
     */
    readonly: boolean;

    /**
     * The Preset being edited.
     */
    preset: Preset;

    /**
     * A copy of the preset.effects.
     */
    effectsOrEx: EffectsOrEx;

    selected: EffectComponentName;
}