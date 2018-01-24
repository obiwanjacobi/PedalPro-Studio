import Preset from "./Preset";
import ApplicationDocument, { PresetCollectionType } from "./ApplicationDocument";

import { LoadPresetsAction } from "./LoadPresetsAction";
import { SelectPresetsAction } from "./SelectPresetsAction";
import { CopyPresetsAction } from "./CopyPresetsAction";
import { EditPresetAction } from "./EditPresetAction";
import { MovePresetAction } from "./MovePresetAction";

// all actions this reducer handles
export type PresetAction = 
    LoadPresetsAction | SelectPresetsAction | CopyPresetsAction | EditPresetAction | MovePresetAction;

export const reduce = (state: ApplicationDocument, action: PresetAction): ApplicationDocument => {
    switch (action.type) {
        case "R/device/presets/":
        if (action.error) { throw action.error; }
        if (action.presets) {
            return reduceLoadPresets(state, action.source, action.presets);
        }
        break;
        
        case "U/*/presets/.selected":
        return reducePresetSelected(state, action.presets, action.selected);

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

const reduceMovePreset = (
    state: ApplicationDocument, 
    preset: Preset, 
    displacement: number): ApplicationDocument => {
    if (displacement === 0) { return state; }

    // local helper function
    const replacePreset = (collection: Preset[]): Preset[] => {
        const index = collection.indexOf(preset);
        if (index === -1) { throw new Error("Invalid preset - not found in collection."); }
        const targetIndex = index + displacement;

        // bounds check
        if (targetIndex < 0 || targetIndex > collection.length) {
            return collection;
        }

        const newCollection = collection.slice();
        newCollection.splice(index, 1); // remove
        newCollection.splice(targetIndex, 0, preset);  // insert

        reIndexPresets(newCollection, Math.min(index, targetIndex), Math.max(index, targetIndex));

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
    selected: boolean): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    // local helper function
    const replacePresets = (collection: Preset[]): Preset[] => {
        const newCollection = collection.slice();

        for (let i: number = 0; i < presets.length; i++) {
            const p = presets[i];
            const index = newCollection.indexOf(p);
            if (index === -1) { throw new Error("Invalid preset - not found in collection."); }

            newCollection[index] = { ...p, selected: selected };
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
        throw new Error(`Unknown collection (source): ${collection} in PresetSelectedAction-Reducer (copyOverride).`);
    }

    return state.copyOverride(device, storage, factory);
}

const reIndexPresets = (mutableCollection: Preset[], beginIndex: number, endIndex: number) => {
    for (let index = beginIndex; index <= endIndex; index++) {
        mutableCollection[index] = { ...mutableCollection[index], index: index }
    }
};