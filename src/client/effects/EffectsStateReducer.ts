import { ApplicationDocument } from "../ApplicationDocument";
import { EditEffectsAction, EditEffectsActionKey } from "./EditEffectsAction";
import { Effects, EffectsEx, EffectNames, EffectsOrEx } from "./Effects";
import { ChangeEffectsActionKey, ChangeEffectsAction } from "./ChangeEffectsAction";
import { mergeEffects, mergeEffectsEx, selectEffect, determineSelectedEffect } from "./EffectsOperations";
import { SelectEffectActionKey, SelectEffectAction } from "./SelectEffectAction";
import { isNullForType } from "./dsp/Dsp";
import { EffectsExBuilder } from "./EffectsExBuilder";

function reduceEditEffects(state: ApplicationDocument, action: EditEffectsAction): ApplicationDocument {
    if (!!action.preset) {
        // from model to extended
        const effects = { ...action.preset.effects } as EffectsOrEx;
        return { ...state, editEffects: { 
            preset: action.preset, 
            effectsOrEx: effects, 
            selected: { effectName: EffectNames.None } 
        } };
    }
    return { ...state, editEffects: undefined };
}

function reduceChangeEffects(state: ApplicationDocument, action: ChangeEffectsAction): ApplicationDocument {
    if (state.editEffects &&
        state.editEffects.effectsOrEx) {
        if (action.effects) {
            return { ...state, editEffects: { 
                preset: state.editEffects.preset, 
                effectsOrEx: mergeEffects(<Effects> state.editEffects.effectsOrEx, action.effects),
                selected: state.editEffects.selected
            }};
        }

        if (action.effectsEx) {
            const effectsEx = <EffectsEx> state.editEffects.effectsOrEx;
            // DSP special case
            // make sure the data structure exists for the selected dsp type/mode
            if (action.effectsEx.dsp && isNullForType(effectsEx.dsp, action.effectsEx.dsp.type)) {
                return { ...state, editEffects: { 
                    preset: state.editEffects.preset, 
                    effectsOrEx: mergeEffectsEx(effectsEx, action.effectsEx, 
                                                EffectsExBuilder.createForDspType(action.effectsEx.dsp.type)),
                    selected: state.editEffects.selected
                }};
            }

            return { ...state, editEffects: { 
                preset: state.editEffects.preset, 
                effectsOrEx: mergeEffectsEx(effectsEx, action.effectsEx),
                selected: state.editEffects.selected
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
                effectsOrEx: selectEffect(
                    state.editEffects.effectsOrEx, action.effectName, state.editEffects.selected.effectName),
                selected: determineSelectedEffect(state.editEffects.effectsOrEx, action.effectName, action.component)
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