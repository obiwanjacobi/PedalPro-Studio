import * as ModelPreset from "../model/Preset";
import { Preset, presetsExceptIndexUiEqual } from "./Preset";
import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { LoadPresetsAction } from "./LoadPresetsAction";
import { ChangePresetsAction } from "./ChangePresetsAction";
import { CopyPresetsAction } from "./CopyPresetsAction";
import { EditPresetAction } from "./EditPresetAction";
import { MovePresetAction } from "./MovePresetAction";
import { SavePresetsAction } from "./SavePresetsAction";
import { ProgressInfo } from "./screen/ScreenState";
import { PastePresetsAction } from "./PastePresetsAction";
import { DeletePresetsAction } from "./DeletePresetsAction";
import { ItemUI, ItemUiModify } from "./ItemUI";
import { PresetArrayBuilder, PresetBuilder } from "./PresetBuilder";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";
import { ScreenBuilder } from "./screen/ScreenBuilder";
import { reduceFault } from "./FaultStateReducer";
import { reducePasteStoragePresets } from "./StorageStateReducer";

// all actions this reducer handles
export type PresetAction = 
    LoadPresetsAction | SavePresetsAction | DeletePresetsAction |
    ChangePresetsAction | CopyPresetsAction | PastePresetsAction |
    EditPresetAction | MovePresetAction;

const reduceMovePreset = (
    state: ApplicationDocument, 
    preset: Preset, 
    displacement: number): ApplicationDocument => {
    if (displacement === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(preset.source, (originalPresets: Preset[]): Preset[] => {
        const presetBuilder = new PresetArrayBuilder(originalPresets);
        const srcIndexPos = presetBuilder.mutable.indexOf(preset);
        if (srcIndexPos === -1) { throw new Error("Invalid preset - not found in collection."); }
        
        const targetIndex = preset.index + displacement;
        if (targetIndex < 0 || targetIndex >= originalPresets.length) { return originalPresets; }

        const targetIndexPos = presetBuilder.mutable.findIndex((prst: Preset) => prst.index === targetIndex);

        if (targetIndexPos === -1) {
            // no preset has the new target index
            // just copy the preset with the new index
            presetBuilder.mutable[srcIndexPos] = { ...preset, index: targetIndex };
        } else {
            const reindex = Math.min(preset.index, presetBuilder.mutable[targetIndex].index);
            presetBuilder.removeAt(srcIndexPos);
            presetBuilder.insertAt(targetIndexPos, preset);
            presetBuilder.reIndexPresets(
                reindex, 
                Math.min(srcIndexPos, targetIndexPos), 
                Math.max(srcIndexPos, targetIndexPos)
            );
        }

        return presetBuilder.detach();
    });

    return builder.detach();
};

const reduceEditPreset = (
    state: ApplicationDocument, 
    preset: Preset, 
    update: Partial<Preset>): ApplicationDocument => {
    if (!update) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(preset.source, (originalPresets: Preset[]): Preset[] => {
        const presetBuilder = new PresetArrayBuilder(originalPresets);
        const p = PresetBuilder.modify(preset, update);
        presetBuilder.replaceByPresetIndex([p]);
        return presetBuilder.detach();
    });

    return builder.detach();
};

const reduceCopyPresets = (
    state: ApplicationDocument, 
    presets: Preset[]): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    const presetBuilder = new PresetArrayBuilder(builder.mutable.clipboard);
    presetBuilder.addRange(presets);
    builder.mutable.clipboard = presetBuilder.detach();
    return builder.detach();
};

const reducePastePresets = (
    state: ApplicationDocument, 
    presets: Preset[], 
    target: PresetCollectionType,
    deleteAfterPaste: boolean): ApplicationDocument => {
    if (presets.length === 0) { return state; }
    if (target === PresetCollectionType.clipboard) { return state; }
    if (target === PresetCollectionType.storage) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(target, (originalPresets: Preset[]): Preset[] => {
        const presetBuilder = new PresetArrayBuilder(originalPresets);
        presetBuilder.forRange(
            presets, 
            (pasted: Preset, index: number) => {
                const overwritten = presetBuilder.mutable[index];
                presetBuilder.mutable[index] = PresetBuilder.modify(pasted, { 
                    origin: PresetBuilder.toModel(overwritten),
                    source: target, 
                    ui: ItemUiModify(pasted.ui, {selected: true})});
            },
            (p1: Preset, p2: Preset): boolean => p1.index === p2.index);

        return presetBuilder.detach();
    });
    
    if (deleteAfterPaste) {
        builder.transformPresets(PresetCollectionType.clipboard, (clipboardPresets: Preset[]): Preset[] => {
            const presetBuilder = new PresetArrayBuilder(clipboardPresets);
            presetBuilder.removeRange(presets, presetsExceptIndexUiEqual);
            return presetBuilder.detach();
        });
    }

    return builder.detach();
};

const reduceChangePresets = (
    state: ApplicationDocument, 
    presets: Preset[], 
    source: PresetCollectionType,
    ui: Partial<ItemUI>): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(source, (originalPresets: Preset[]): Preset[] => {
        const presetBuilder = new PresetArrayBuilder(originalPresets);
        presetBuilder.forRange(presets, (p: Preset, index: number) => {
            presetBuilder.mutable[index] = PresetBuilder.modify(p, { ui: ItemUiModify(p.ui, ui) });
        });
        return presetBuilder.detach();
    });

    return builder.detach();
};

const reduceLoadPresets = (
    state: ApplicationDocument, 
    source: PresetCollectionType, 
    presets: Preset[],
    progress?: ProgressInfo): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    if (progress) {
        const screenBuilder = new ScreenBuilder(builder.mutable.screen);
        screenBuilder.mutable.progress = progress;
        builder.mutable.screen = screenBuilder.detach();
    }

    builder.transformPresets(source, (originalPresets: Preset[]) => {
        if (originalPresets.length === 0) { return presets; }

        const presetBuilder = new PresetArrayBuilder(originalPresets);
        presetBuilder.replaceByPresetIndex(presets);
        return presetBuilder.detach();
    });

    return builder.detach();
};

const reduceDeletePresets = (
    state: ApplicationDocument, source: PresetCollectionType, deleted: Preset[]): ApplicationDocument => {
    
    if (!state.empty) { return state; }
    if (source === PresetCollectionType.factory) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(source, (originalPresets: Preset[]): Preset[] => {
        const deleteBuilder = new PresetArrayBuilder(deleted);
        deleteBuilder.forEach((p: Preset, index: number) => {
            deleteBuilder.mutable[index] = PresetBuilder.delete(p, <ModelPreset.Preset> state.empty);
        });

        const presetBuilder = new PresetArrayBuilder(originalPresets);
        presetBuilder.replaceByPresetIndex(deleteBuilder.detach());
        return presetBuilder.detach();
    });

    return builder.detach();
};

export const reduce = (state: ApplicationDocument, action: PresetAction): ApplicationDocument => {
    switch (action.type) {
        case "R/*/presets/":
        if (action.error) { 
            return reduceFault(state, action.source, action.error);
        }
        if (action.presets) {
            return reduceLoadPresets(
                state, action.source, action.presets, action.progress ? action.progress : undefined);
        }
        break;
        case "U/*/presets/":
        if (action.error) { 
            return reduceFault(state, action.source, action.error);
        }
        if (action.presets) {
            return reduceLoadPresets(state, action.source, action.presets);
        }
        break;
        case "D/*/presets/":
        return reduceDeletePresets(state, action.source, action.presets);

        case "U/*/presets/ui":
        return reduceChangePresets(state, action.presets, action.source, action.ui);

        case "C/clipboard/presets/":
        return reduceCopyPresets(state, action.presets);

        case "C/*/presets/":
        if (action.target === PresetCollectionType.storage) {
            return reducePasteStoragePresets(state, action.presets, action.deleteAfterPaste);
        }
        return reducePastePresets(state, action.presets, action.target, action.deleteAfterPaste);

        case "U/*/presets/.*":
        return reduceEditPreset(state, action.preset, action.update);

        case "U/*/presets/[]":
        return reduceMovePreset(state, action.preset, action.displacement);

        default:
        break;
    }

    return state;
};