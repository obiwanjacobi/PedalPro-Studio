import { Preset } from "../preset/Preset";
import { Effects, EffectsEx } from "./Effects";

export interface EffectState {
    /**
     * The Preset being edited.
     */
    preset: Preset;

    /**
     * A copy of the preset.effects.
     */
    effects: Effects | EffectsEx;
}