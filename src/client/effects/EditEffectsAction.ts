import { Preset } from "../preset/Preset";

export enum EditEffectsActionKey {
    type = "R/*/presets[*]/effects"
}

export interface EditEffectsAction {
    readonly type: EditEffectsActionKey.type;
    readonly preset?: Preset;
}

export function createEditEffectsAction(preset?: Preset): EditEffectsAction {
    return { 
        type: EditEffectsActionKey.type, 
        preset: preset, 
    };
}

export interface EditEffects {
    editEffects(preset?: Preset): void;
}