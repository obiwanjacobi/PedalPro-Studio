import { Effects, EffectsEx } from "./Effects";

export enum SaveEffectsActionKey {
    type = "U/*/presets[*]/effects"
}

export interface SaveEffectsAction {
    readonly type: SaveEffectsActionKey.type;
    readonly effects?: Effects;
    readonly effectsEx?: EffectsEx;
}

export function createSaveEffectsAction(effects: Effects): SaveEffectsAction {
    return { 
        type: SaveEffectsActionKey.type,
        effects: effects
    };
}

export function createSaveEffectsExAction(effectsEx: EffectsEx): SaveEffectsAction {
    return { 
        type: SaveEffectsActionKey.type,
        effectsEx: effectsEx
    };
}

export interface SaveEffects {
    saveEffects(effects: Effects): void;
}

export interface SaveEffectsEx {
    saveEffectsEx(effectsEx: EffectsEx): void;
}