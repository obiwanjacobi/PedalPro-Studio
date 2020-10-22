import { EffectNames } from "./Effects";

export enum SelectEffectActionKey {
    type = "U/*/presets/effects[]/ui"
}

export interface SelectEffectAction {
    readonly type: SelectEffectActionKey.type;
    readonly effectName: EffectNames;
    readonly component?: string;
}

export function createSelectEffectAction 
    (effectName: EffectNames, component?: string): SelectEffectAction {
        return { type: SelectEffectActionKey.type, effectName: effectName, component: component };
}

export interface SelectEffect {
    selectEffect(effectName: EffectNames, component?: string): void;
}
