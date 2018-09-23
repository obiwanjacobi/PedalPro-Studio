import { Effects, EffectsEx, EffectsOrEx } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";

export enum ChangeEffectsActionKey {
    type = "U/*/presets/effects[]/"
}

export interface ChangeEffectsAction {
    readonly type: ChangeEffectsActionKey.type;
    readonly effects?: RecursivePartial<Effects>;
    readonly effectsEx?: RecursivePartial<EffectsEx>;
}

export function createChangeEffectsAction 
    (effectsOrEx: RecursivePartial<EffectsOrEx>): ChangeEffectsAction {
        const effects = effectsOrEx as RecursivePartial<Effects>;
        if (effects) {
            return { 
                type: ChangeEffectsActionKey.type, 
                effects: effects, 
            };
        }
    
        const effectsEx = effectsOrEx as RecursivePartial<EffectsEx>;
        if (effectsEx) {
            return { 
                type: ChangeEffectsActionKey.type, 
                effectsEx: effectsEx, 
            };
        }

        throw new Error("Could not determine: Effects or EffectsEx");
}

export interface ChangeEffects {
    changeEffects(effects?: RecursivePartial<EffectsOrEx>): void;
}
