import { ApplicationDocument } from "../ApplicationDocument";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import { Preset } from "../preset/Preset";
import { PresetBuilder, PresetArrayBuilder } from "../preset/PresetBuilder";
import { EditEffectsAction, EditEffectsActionKey } from "./EditEffectsAction";
import { SaveEffectsAction, SaveEffectsActionKey } from "./SaveEffectsAction";
import { Effects, EffectsEx } from "./Effects";
import { ChangeEffectsActionKey, ChangeEffectsAction } from "./ChangeEffectsAction";
import { 
    compareEffects, mergeEffects, mergeEffectsEx, selectEffect, determineSelectedEffect, makeWorkingCopy 
} from "./EffectsOperations";
import { SelectEffectActionKey, SelectEffectAction } from "./SelectEffectAction";
import { isNullForType } from "./dsp/Dsp";
import { EffectsExBuilder } from "./EffectsExBuilder";

function reduceEditEffects(state: ApplicationDocument, action: EditEffectsAction): ApplicationDocument {
    if (!!action.preset) {
        const selected = determineSelectedEffect(action.preset.effects);
        const effectsOrEx = selectEffect(makeWorkingCopy(action.preset.effects), selected.effectName);

        return { ...state, editEffects: { 
            preset: action.preset, 
            effectsOrEx: effectsOrEx, 
            selected: selected
        } };
    }
    return { ...state, editEffects: undefined };
}

function reduceSaveEffects(state: ApplicationDocument, _: SaveEffectsAction): ApplicationDocument {
    if (state.editEffects && 
        state.editEffects.preset) {

        // A copy of the effects was made, compare-by-value recursively to determine if anything has changed
        if (compareEffects(state.editEffects.preset.effects, state.editEffects.effectsOrEx)) {
            return state;
        }
        
        const builder = new ApplicationDocumentBuilder(state);
        builder.transformPresets(state.editEffects.preset.source, (originalPresets: Preset[]): Preset[] => {
            if (state.editEffects &&
                state.editEffects.effectsOrEx) {

                const presetBuilder = new PresetArrayBuilder(originalPresets);
                const update: Partial<Preset> = { effects: state.editEffects.effectsOrEx };
                const p = PresetBuilder.modify(state.editEffects.preset, update);
                presetBuilder.replaceByPresetIndex([p]);
                return presetBuilder.detach();
            }
            return originalPresets;
        });

        return builder.detach();
    }
    return state;
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
        const selected = 
            determineSelectedEffect(state.editEffects.effectsOrEx, action.effectName, action.component);
        const effectsOrEx = 
            selectEffect(state.editEffects.effectsOrEx, selected.effectName, state.editEffects.selected.effectName);

        return { ...state, 
            editEffects: { 
                preset: state.editEffects.preset,
                effectsOrEx: effectsOrEx,
                selected: selected
            }
        };
    }
    return state;
}

export type EffectsAction = EditEffectsAction | SaveEffectsAction | ChangeEffectsAction | SelectEffectAction;

export function reduce(state: ApplicationDocument, action: EffectsAction): ApplicationDocument {
    switch (action.type) {
        case EditEffectsActionKey.type:
            return reduceEditEffects(state, action);
        case SaveEffectsActionKey.type:
            return reduceSaveEffects(state, action);
        case ChangeEffectsActionKey.type:
            return reduceChangeEffects(state, action);
        case SelectEffectActionKey.type:
            return reduceSelectEffect(state, action);
        default:
            return state;
    }
}