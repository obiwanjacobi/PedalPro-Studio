import { Preset } from "../preset/Preset";

export enum EditEffectsActionKey {
    type = "U/*/presets[*]/effects"
}

export interface EditEffectsAction {
    readonly type: EditEffectsActionKey.type;
    readonly preset?: Preset;
}

export const createEditEffectsAction = 
    (preset?: Preset): EditEffectsAction => {
    return { 
        type: EditEffectsActionKey.type, 
        preset: preset, 
    };
};

export interface EditEffects {
    editEffects(preset?: Preset): void;
}