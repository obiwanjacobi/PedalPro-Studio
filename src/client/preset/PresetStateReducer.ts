import { Preset } from "./Preset";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { LoadPresetsAction } from "./LoadPresetsAction";
import { ChangePresetsAction } from "./ChangePresetsAction";
import { CopyPresetsAction } from "./CopyPresetsAction";
import { EditPresetAction } from "./EditPresetAction";
import { MovePresetsAction } from "./MovePresetsAction";
import { SavePresetsAction } from "./SavePresetsAction";
import { ProgressInfo } from "../screen/ScreenState";
import { PastePresetsAction } from "./PastePresetsAction";
import { DeletePresetsAction } from "./DeletePresetsAction";
import { ItemUI, itemUiModify } from "../ItemUI";
import { PresetArrayBuilder, PresetBuilder } from "./PresetBuilder";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import { ScreenBuilder } from "../screen/ScreenBuilder";
import { presetsExceptIndexAreEqual } from "./PresetOperations";

// all actions this reducer handles
export type PresetAction =
    LoadPresetsAction | SavePresetsAction | DeletePresetsAction |
    ChangePresetsAction | CopyPresetsAction | PastePresetsAction |
    EditPresetAction | MovePresetsAction;

const reduceMovePresets = (
    state: ApplicationDocument,
    presets: Preset[],
    targetIndex: number,
    swap: boolean): ApplicationDocument => {
    if (presets.length === 0) { return state; }

    const collection = presets[0].source;
    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(collection, (originalPresets: Preset[]): Preset[] => {
        const presetBuilder = new PresetArrayBuilder(originalPresets);
        if (swap) {
            presetBuilder.swapPresets(presets, targetIndex);
        } else {
            presetBuilder.movePresets(presets, targetIndex);
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

    const builder = new ApplicationDocumentBuilder(state);
    builder.mutable.clipboard = presets;
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
                    ui: itemUiModify(pasted.ui, { selected: true })
                });
            },
            (p1: Preset, p2: Preset): boolean => p1.index === p2.index);

        return presetBuilder.detach();
    });

    if (deleteAfterPaste) {
        builder.transformPresets(PresetCollectionType.clipboard, (clipboardPresets: Preset[]): Preset[] => {
            const presetBuilder = new PresetArrayBuilder(clipboardPresets);
            presetBuilder.removeRange(presets, presetsExceptIndexAreEqual);
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
            presetBuilder.mutable[index] = PresetBuilder.modify(p, { ui: itemUiModify(p.ui, ui) });
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

export const reduceDeletePresets = (
    state: ApplicationDocument, source: PresetCollectionType, deleted: Preset[]): ApplicationDocument => {

    if (source === PresetCollectionType.factory) { return state; }
    if (source === PresetCollectionType.storage) { return state; }
    if (source === PresetCollectionType.device && !state.empty) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    builder.transformPresets(source, (originalPresets: Preset[]): Preset[] => {
        const deleteBuilder = new PresetArrayBuilder(deleted);
        deleteBuilder.forEach((p: Preset, index: number) => {
            // @ts-ignore: undefined
            deleteBuilder.mutable[index] = PresetBuilder.delete(p, state.empty);
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
            return reduceLoadPresets(state, action.source, action.presets, action.progress);

        case "U/*/presets/":
            return reduceLoadPresets(state, action.source, action.presets);

        case "D/*/presets/":
            return reduceDeletePresets(state, action.source, action.presets);

        case "U/*/presets/ui":
            return reduceChangePresets(state, action.presets, action.source, action.ui);

        case "C/clipboard/presets/":
            return reduceCopyPresets(state, action.presets);

        case "C/*/presets/":
            return reducePastePresets(state, action.presets, action.target, action.deleteAfterPaste);

        case "U/*/presets/.*":
            return reduceEditPreset(state, action.preset, action.update);

        case "U/*/presets/[]":
            return reduceMovePresets(state, action.presets, action.targetIndex, action.swap);

        default:
            break;
    }

    return state;
};