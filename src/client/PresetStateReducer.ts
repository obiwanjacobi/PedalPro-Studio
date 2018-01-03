import { AnyAction } from "redux";
import iassign from "immutable-assign";

import { LoadPresetsAction } from "./LoadPresetsAction";
import { PresetSelectedAction } from "./PresetSelectedAction";
import Preset from "./Preset";
import ApplicationDocument from "./ApplicationDocument";

// all actions this reducer handles
export type PresetAction = LoadPresetsAction | PresetSelectedAction;

// could be moved to parent reducer
export const reduce = (state: ApplicationDocument, action: AnyAction): ApplicationDocument => {
    
    return reducePresets(state, <PresetAction> action);
};

const reducePresets = (state: ApplicationDocument, action: PresetAction): ApplicationDocument => {
    switch (action.type) {
        case "R/device/presets/*":
        if (action.error) { throw action.error; }
        if (action.presets) {
            return reduceLoadPresets(state, action.source, action.presets);
        }
        break;
        case "U/*/preset.selected":
        return reducePresetSelected(state, action.preset, action.selected);
        default:
        throw new Error("Unknown action.");
    }

    return state;
};

const reducePresetSelected = (state: ApplicationDocument, preset: Preset, selected: boolean): ApplicationDocument => {
    // local helper function
    const selectPreset = (collection: Preset[], match: Preset, value: boolean): Preset[] => {
        const index = collection.indexOf(match);
        if (index === -1) {
            throw new Error(`Preset ${preset.source}/${preset.name} not found for PresetSelectedAction-Reducer.`);
        }

        return iassign(
            collection, 
            (presets: Preset[]) => presets[index],
            (selectedPreset: Preset) => { return { ...selectedPreset, selected: value }; });
    };

    let local: Preset[] | null = null;
    let device: Preset[] | null = null;
    let storage: Preset[] | null = null;
    let factory: Preset[] | null = null;

    switch (preset.source) {
        case "local":
        local = selectPreset(state.local, preset, selected);
        break;
        
        case "device":
        device = selectPreset(state.device, preset, selected);
        break;
        
        case "storage":
        storage = selectPreset(state.storage, preset, selected);
        break;
        
        case "factory":
        factory = selectPreset(state.factory, preset, selected);
        break;
        
        default: 
        throw new Error(`Unknown source: ${preset.source} in PresetSelectedAction-Reducer.`);
    }

    return state.CopyOverride(local, device, storage, factory);
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
            default:
            throw new Error(`Unknown source: ${source} in PresetSelectedAction-Reducer.`);
        }
};