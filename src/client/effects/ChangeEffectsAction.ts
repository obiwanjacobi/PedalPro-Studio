import { Effects, EffectsEx } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";

export enum ChangeEffectsActionKey {
    type = "U/*/presets/effects[]/"
}

export interface ChangeEffectsAction {
    readonly type: ChangeEffectsActionKey.type;
    readonly effects?: RecursivePartial<Effects>;
    readonly effectsEx?: RecursivePartial<EffectsEx>;
}

export function createChangeEffectsExAction 
    (effectsEx: RecursivePartial<EffectsEx>): ChangeEffectsAction {
        return { 
            type: ChangeEffectsActionKey.type, 
            effectsEx: effectsEx, 
        };
}

export interface ChangeEffectsEx {
    changeEffectsEx(effects: RecursivePartial<EffectsEx>): void;
}

export function createChangeEffectsAction 
    (effects: RecursivePartial<Effects>): ChangeEffectsAction {
        return { 
            type: ChangeEffectsActionKey.type, 
            effects: effects, 
        };
}

export interface ChangeEffects {
    changeEffects(effects: RecursivePartial<Effects>): void;
}
