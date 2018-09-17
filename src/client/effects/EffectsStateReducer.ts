import { ApplicationDocument } from "../ApplicationDocument";
import { EditEffectsAction, EditEffectsActionKey } from "./EditEffectsAction";
import { Effects, EffectsEx, EffectNames } from "./Effects";
import { ChangeEffectsActionKey, ChangeEffectsAction } from "./ChangeEffectsAction";
import { mergeEffects, mergeEffectsEx, changeEffectsUI } from "./EffectsOperations";
import { SelectEffectActionKey, SelectEffectAction } from "./SelectEffectAction";

function reduceEditEffects(state: ApplicationDocument, action: EditEffectsAction): ApplicationDocument {
    if (!!action.preset) {
        // from model to extended
        const effects = { ...action.preset.effects } as Effects | EffectsEx;
        return { ...state, editEffects: { 
            preset: action.preset, 
            effects: effects, 
            selected: { effectName: EffectNames.None } 
        } };
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
                effects: mergeEffects(<Effects> state.editEffects.effects, action.effects),
                selected: { effectName: EffectNames.None }
            }};
        }

        if (action.effectsEx) {
            return { ...state, editEffects: { 
                preset: state.editEffects.preset, 
                effects: mergeEffectsEx(<EffectsEx> state.editEffects.effects, action.effectsEx),
                selected: { effectName: EffectNames.None }
            }};
        }
    }
    return state;
}

function reduceSelectEffect(state: ApplicationDocument, action: SelectEffectAction): ApplicationDocument {
    if (state.editEffects) {
        return { ...state, 
            editEffects: { 
                preset: state.editEffects.preset,
                effects: changeEffectsUI(state.editEffects.effects, action.selected, {}),
                selected: { effectName: action.selected, componentName: action.component }
            }
        };
    }
    return state;
}

export type EffectsAction = EditEffectsAction | ChangeEffectsAction | SelectEffectAction;

export function reduce(state: ApplicationDocument, action: EffectsAction): ApplicationDocument {
    switch (action.type) {
        case EditEffectsActionKey.type:
            return reduceEditEffects(state, action);
        case ChangeEffectsActionKey.type:
            return reduceChangeEffects(state, action);
        case SelectEffectActionKey.type:
            return reduceSelectEffect(state, action);
        default:
            return state;
    }
}