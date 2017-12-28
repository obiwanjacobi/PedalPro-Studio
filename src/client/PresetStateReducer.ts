import { AnyAction } from "redux";

import * as PresetsActions from "./LoadPresetsAction";
import Preset from "../model/Preset";
import ApplicationDocument from "./ApplicationDocument";

// all actions this reducer handles
export type PresetAction = PresetsActions.LoadPresetsAction;

// could be moved to parent reducer
export const reduce = (state: ApplicationDocument, action: AnyAction): ApplicationDocument => {
    return reducePresets(state, <PresetAction> action);
};

const reducePresets = (state: ApplicationDocument, action: PresetAction): ApplicationDocument => {
    switch (action.type) {
        case PresetsActions.LoadPresetsActionKey:
        if (action.error) { throw action.error; }
        if (action.presets) {
            return reduceLoadPresets(state, action.source, action.presets);
        }
        break;
        default: break;
    }

    return state;
};

const reduceLoadPresets = 
    (state: ApplicationDocument, source: string, presets: Preset[]): ApplicationDocument => {
        switch (source) {
            case "local":
            return state.CopyOverride(presets);
            case "device":
            return state.CopyOverride(null, presets);
            case "storage":
            return state.CopyOverride(null, null, presets);
            case "factory":
            return state.CopyOverride(null, null, null, presets);
            default: break;
        }

        return state;
};