import { EffectNames } from "./Effects";

export enum SelectEffectActionKey {
    type = "U/*/presets/effects[]/ui"
}

export interface SelectEffectAction {
    readonly type: SelectEffectActionKey.type;
    readonly selected: EffectNames;
    readonly component?: string;
}

export function createSelectEffectAction 
    (selected: EffectNames, component?: string): SelectEffectAction {
        return { type: SelectEffectActionKey.type, selected: selected, component: component };
}

export interface SelectEffect {
    selectEffect(selected: EffectNames, component?: string): void;
}
