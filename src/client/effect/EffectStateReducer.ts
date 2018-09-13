import { ApplicationDocument } from "../ApplicationDocument";
import { EditEffectsAction, EditEffectsActionKey } from "./EditEffectsAction";

export type EffectAction = EditEffectsAction;

export function reduce(state: ApplicationDocument, action: EffectAction): ApplicationDocument {
    switch (action.type) {
        case EditEffectsActionKey.type:
            return { ...state, effects: { preset: action.preset} };
        default:
            return state;
    }
}