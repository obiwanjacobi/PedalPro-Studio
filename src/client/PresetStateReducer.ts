import { AnyAction } from "redux";

import { LoadPresetsAction } from "./LoadPresetsAction";
import { PresetSelectedAction } from "./PresetSelectedAction";
import { CopyPresetsAction } from "./CopyPresetsAction";

import Preset from "./Preset";
import ApplicationDocument from "./ApplicationDocument";

// all actions this reducer handles
export type PresetAction = LoadPresetsAction | PresetSelectedAction | CopyPresetsAction;

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
        return reducePresetSelected(state, action.presets, action.selected);

        case "C/*/presets/*":
        return reduceCopyPresets(state, action.presets, action.target);

        default:
        throw new Error("Unknown action.");
    }

    return state;
};

const reduceCopyPresets = 
    (state: ApplicationDocument, presets: Preset[], target: string): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    // local helper function
    const copyPresets = (collection: Preset[], copies: Preset[], newSource: string): Preset[] => {
        const newCollection = collection.slice();

        for (let i: number = 0; i < copies.length; i++) {
            const p = copies[i];
            newCollection.push({ 
                ...p, 
                copiedFrom: p.source, 
                source: newSource,
                previousIndex: p.index,
                index: newCollection.length
            });
        }

        return newCollection;
    };

    let local: Preset[] | null = null;
    let device: Preset[] | null = null;
    let storage: Preset[] | null = null;
    let factory: Preset[] | null = null;

    switch (target) {
        case "local":
        local = copyPresets(state.local, presets, target);
        break;
        
        case "device":
        device = copyPresets(state.device, presets, target);
        break;
        
        case "storage":
        storage = copyPresets(state.storage, presets, target);
        break;
        
        case "factory":
        factory = copyPresets(state.factory, presets, target);
        break;
        
        default: 
        throw new Error(`Unknown source: ${presets[0].source} in PresetSelectedAction-Reducer.`);
    }

    return state.copyOverride(local, device, storage, factory);
};

const reducePresetSelected = 
    (state: ApplicationDocument, presets: Preset[], selected: boolean): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    // local helper function
    const replacePresets = (collection: Preset[], matches: Preset[], value: boolean): Preset[] => {
        const newCollection = collection.slice();

        for (let i: number = 0; i < matches.length; i++) {
            const p = matches[i];
            const index = newCollection.indexOf(p);
            if (index === -1) { throw new Error("Invalid preset - not found in collection."); }

            newCollection[index] = { ...p, selected: value};
        }

        return newCollection;
    };

    let local: Preset[] | null = null;
    let device: Preset[] | null = null;
    let storage: Preset[] | null = null;
    let factory: Preset[] | null = null;

    switch (presets[0].source) {
        case "local":
        local = replacePresets(state.local, presets, selected);
        break;
        
        case "device":
        device = replacePresets(state.device, presets, selected);
        break;
        
        case "storage":
        storage = replacePresets(state.storage, presets, selected);
        break;
        
        case "factory":
        factory = replacePresets(state.factory, presets, selected);
        break;
        
        default: 
        throw new Error(`Unknown source: ${presets[0].source} in PresetSelectedAction-Reducer.`);
    }

    return state.copyOverride(local, device, storage, factory);
};

const reduceLoadPresets = 
    (state: ApplicationDocument, source: string, presets: Preset[]): ApplicationDocument => {
        switch (source) {
            case "local":
            return state.copyOverride(presets);

            case "device":
            return state.copyOverride(null, presets);

            case "storage":
            return state.copyOverride(null, null, presets);

            case "factory":
            return state.copyOverride(null, null, null, presets);
            
            default:
            throw new Error(`Unknown source: ${source} in PresetSelectedAction-Reducer.`);
        }
};