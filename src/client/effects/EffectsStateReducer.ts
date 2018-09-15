import { ApplicationDocument } from "../ApplicationDocument";
import { EditEffectsAction, EditEffectsActionKey } from "./EditEffectsAction";
import { Effects } from "./Effects";

export type EffectsAction = EditEffectsAction;

function reduceEditEffects(state: ApplicationDocument, action: EditEffectsAction): ApplicationDocument {
    if (!!action.preset) {
        const effects = { ...action.preset.effects } as Effects;
        return { ...state, editEffects: { preset: action.preset, effects: effects } };
    }
    return { ...state, editEffects: undefined };
}

export function reduce(state: ApplicationDocument, action: EffectsAction): ApplicationDocument {
    switch (action.type) {
        case EditEffectsActionKey.type:
            return reduceEditEffects(state, action);
        default:
            return state;
    }
}