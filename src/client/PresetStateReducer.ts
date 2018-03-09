import Fault from "../model/Fault";
import Preset from "./Preset";
import ApplicationDocument, { PresetCollectionType } from "./ApplicationDocument";

import { LoadPresetsAction } from "./LoadPresetsAction";
import { SelectPresetsAction } from "./SelectPresetsAction";
import { CopyPresetsAction } from "./CopyPresetsAction";
import { EditPresetAction } from "./EditPresetAction";
import { MovePresetAction } from "./MovePresetAction";

const PresetCount = 400;

// all actions this reducer handles
export type PresetAction = 
    LoadPresetsAction | SelectPresetsAction | CopyPresetsAction | EditPresetAction | MovePresetAction;

const copyOverride = (
    state: ApplicationDocument, 
    collection: PresetCollectionType, 
    process: (presets: Preset[]) => Preset[]): ApplicationDocument => {

    let device: Preset[] | null = null;
    let storage: Preset[] | null = null;
    let factory: Preset[] | null = null;

    switch (collection) {
        case PresetCollectionType.device:
        device = process(state.device);
        break;
        
        case PresetCollectionType.storage:
        storage = process(state.storage);
        break;
        
        case PresetCollectionType.factory:
        factory = process(state.factory);
        break;
        
        default: 
        throw new RangeError(
            `Unknown collection (source): ${collection} in PresetSelectedAction-Reducer (copyOverride).`);
    }

    return state.copyOverride(device, storage, factory);
};

const reIndexPresets = (presetIndex: number, mutableCollection: Preset[], beginIndex: number, endIndex: number) => {
    for (let indexPos = beginIndex; indexPos <= endIndex; indexPos++) {
        mutableCollection[indexPos] = { ...mutableCollection[indexPos], index: presetIndex };
        presetIndex++;
    }
};

const reduceMovePreset = (
    state: ApplicationDocument, 
    preset: Preset, 
    displacement: number): ApplicationDocument => {
    if (displacement === 0) { return state; }

    // local helper function
    const replacePreset = (collection: Preset[]): Preset[] => {
        const indexPos = collection.indexOf(preset);
        if (indexPos === -1) { throw new Error("Invalid preset - not found in collection."); }
        
        const targetIndex = preset.index + displacement;
        if (targetIndex < 0 || targetIndex >= PresetCount) { return collection; }

        const newCollection = collection.slice();
        const targetIndexPos = collection.findIndex((prst: Preset) => prst.index === targetIndex);
        if (targetIndexPos === -1) {
            // no preset has the new target index
            // just copy the preset with the new index
            newCollection[indexPos] = { ...preset, index: targetIndex };
        } else {
            const reindex = Math.min(preset.index, newCollection[targetIndex].index);
            newCollection.splice(indexPos, 1); // remove
            newCollection.splice(targetIndexPos, 0, preset);  // insert
    
            reIndexPresets(
                reindex,
                newCollection, 
                Math.min(indexPos, targetIndexPos), 
                Math.max(indexPos, targetIndexPos));
        }
        return newCollection;
    };

    return copyOverride(state, preset.source, replacePreset);
};

const reduceEditPreset = (
    state: ApplicationDocument, 
    preset: Preset, 
    update: Partial<Preset>): ApplicationDocument => {
    if (!update) { return state; }

    // local helper function
    const replacePreset = (collection: Preset[]): Preset[] => {
        const newCollection = collection.slice();

        const index = newCollection.indexOf(preset);
        if (index === -1) { throw new Error("Invalid preset - not found in collection."); }

        newCollection[index] = { ...preset, ...update };

        return newCollection;
    };

    return copyOverride(state, preset.source, replacePreset);
};

const reduceCopyPresets = (
    state: ApplicationDocument, 
    presets: Preset[], 
    target: PresetCollectionType): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    // local helper function
    const copyPresets = (collection: Preset[]): Preset[] => {
        const newCollection = collection.slice();

        for (let i: number = 0; i < presets.length; i++) {
            const p = presets[i];
            newCollection.push({ 
                ...p, 
                source: target,
                index: newCollection.length
            });
        }

        return newCollection;
    };

    return copyOverride(state, target, (oldPresets: Preset[]) => copyPresets(oldPresets));
};

const reducePresetSelected = (
    state: ApplicationDocument, 
    presets: Preset[], 
    selected?: boolean,
    expanded?: boolean): ApplicationDocument => {
    if (presets.length === 0) { return state; }
    if (selected === undefined && expanded === undefined) { return state; }

    // local helper function
    const replacePresets = (collection: Preset[]): Preset[] => {
        const newCollection = collection.slice();

        for (let i: number = 0; i < presets.length; i++) {
            const p = presets[i];
            const index = newCollection.indexOf(p);
            if (index === -1) { throw new Error("Invalid preset - not found in collection."); }

            if (selected !== undefined) {
                newCollection[index] = { ...p, uiSelected: selected === true };
            }
            if (expanded !== undefined) {
                newCollection[index] = { ...p, uiExpanded: expanded === true };
            }
        }

        return newCollection;
    };

    return copyOverride(state, presets[0].source, (oldPresets: Preset[]) => replacePresets(oldPresets));
};

const reduceLoadPresets = (
    state: ApplicationDocument, 
    source: PresetCollectionType, 
    presets: Preset[]): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    return copyOverride(state, source, () => presets);
};

const reduceFault = (state: ApplicationDocument, source: PresetCollectionType, fault: Fault): ApplicationDocument => {
    return state.copyOverrideNotification([{
            type: "warning", 
            message: fault.message, 
            context: source.toString().toUpperCase() },
        ...state.notifications]);
};

export const reduce = (state: ApplicationDocument, action: PresetAction): ApplicationDocument => {
    switch (action.type) {
        case "R/device/presets/":
        if (action.error) { 
            return reduceFault(state, action.source, action.error);
        }
        if (action.presets) {
            return reduceLoadPresets(state, action.source, action.presets);
        }
        break;
        
        case "U/*/presets/.selected":
        return reducePresetSelected(state, action.presets, action.selected, action.expanded);

        case "C/*/presets/":
        return reduceCopyPresets(state, action.presets, action.target);

        case "U/*/presets/.*":
        return reduceEditPreset(state, action.preset, action.update);

        case "U/*/presets/[]":
        return reduceMovePreset(state, action.preset, action.displacement);

        default:
        return state;
    }

    return state;
};