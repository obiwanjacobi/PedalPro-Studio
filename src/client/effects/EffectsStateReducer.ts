import { ApplicationDocument } from "../ApplicationDocument";
import { EditEffectsAction, EditEffectsActionKey } from "./EditEffectsAction";
import { Effects, EffectsEx } from "./Effects";
import { ChangeEffectsActionKey, ChangeEffectsAction } from "./ChangeEffectsAction";
import { mergeEffects, mergeEffectsEx } from "./EffectsOperations";

function reduceEditEffects(state: ApplicationDocument, action: EditEffectsAction): ApplicationDocument {
    if (!!action.preset) {
        // from model to extended
        const effects = { ...action.preset.effects } as Effects | EffectsEx;
        return { ...state, editEffects: { preset: action.preset, effects: effects } };
    }
    return { ...state, editEffects: undefined };
}

function reduceChangeEffects(state: ApplicationDocument, action: ChangeEffectsAction): ApplicationDocument {
    if (state.editEffects &&
        state.editEffects.effects)
    {
        if (action.effects) {
            return { ...state, editEffects: { 
                preset: state.editEffects.preset, 
                effects: mergeEffects(<Effects> state.editEffects.effects, action.effects)
            }};
        }

        if (action.effectsEx) {
            return { ...state, editEffects: { 
                preset: state.editEffects.preset, 
                effects: mergeEffectsEx(<EffectsEx> state.editEffects.effects, action.effectsEx)
            }};
        }

    }
    return state;
}

export type EffectsAction = EditEffectsAction | ChangeEffectsAction;

export function reduce(state: ApplicationDocument, action: EffectsAction): ApplicationDocument {
    switch (action.type) {
        case EditEffectsActionKey.type:
            return reduceEditEffects(state, action);
        case ChangeEffectsActionKey.type:
            return reduceChangeEffects(state, action);
        default:
            return state;
    }
}