import { clone, cloneDeep } from "lodash";

import { Preset } from "./Preset";
import * as ModelPreset from "../../model/Preset";
import { ArrayBuilder, ItemBuilder, CopyOption, MatchItemFn, ItemFn } from "../StateBuilder";
import { itemUiModify } from "../ItemUI";
import { presetsAreEqual, presetHasChanged, minPresetIndex } from "./PresetOperations";
import { PresetCollectionType } from "../ApplicationDocument";

const ToBeDeletedPreset: Partial<Preset> = {
    meta: { device: PresetCollectionType.storage.toUpperCase() },
    traits: {
        empty: true,
        expression: false,
        humbucker: false,
        singleCoil: false,
        stereo: false
    }
};

export class PresetBuilder extends ItemBuilder<Preset> {
    public static modify(preset: Preset, update: Partial<Preset>): Preset {
        return { ...preset, ...update };
    }

    public static delete(preset: Preset, empty: Partial<Preset>): Preset {
        return { ...preset, ...empty, ui: itemUiModify(preset.ui, { markedDeleted: true }) };
    }

    public static toModel(preset: Preset): ModelPreset.Preset {
        return {
            effects: preset.effects,
            index: preset.index,
            name: preset.name,
            meta: preset.meta,
            traits: preset.traits
        };
    }

    public constructor(state: Preset, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public acceptChanges() {
        this.mutable.origin = {
            effects: cloneDeep(this.mutable.effects),
            index: this.mutable.index,
            meta: cloneDeep(this.mutable.meta),
            name: clone(this.mutable.name),
            traits: cloneDeep(this.mutable.traits),
        };
    }

    public toModel(): ModelPreset.Preset {
        return PresetBuilder.toModel(this.mutable);
    }
}

export class PresetArrayBuilder extends ArrayBuilder<Preset> {
    public removeByGroup(groupName: string) {
        const toRemove = this.mutable.filter(p => p.group && p.group.name === groupName);
        this.removeRange(toRemove);
    }

    public forRange(these: Preset[], func: ItemFn<Preset>, matchFn: MatchItemFn<Preset> = presetsAreEqual) {
        super.forRange(these, func, matchFn);
    }

    public forEach(func: ItemFn<Preset>) {
        for (let i = 0; i < this.mutable.length; i++) {
            func(this.mutable[i], i);
        }
    }

    public replaceByPresetIndex(replacements: Preset[]) {
        replacements.forEach(replacement => {
            const replacementGroupName = replacement.group ? replacement.group.name : "";

            const index = this.mutable.findIndex(p =>
                (p.group &&
                    p.group.name === replacementGroupName &&
                    p.index === replacement.index)
                ||
                (!p.group && replacementGroupName.length === 0 &&
                    p.index === replacement.index)
            );
            if (index >= 0) {
                this.mutable[index] = replacement;
            } else {
                this.mutable.push(replacement);
            }
        });
    }

    public movePresets(presetsToMove: Preset[], targetIndex: ModelPreset.PresetIndex) {
        if (presetsToMove.length === 0) { return; }
        const sourceIndex = minPresetIndex(presetsToMove);
        const arraySourceIndex = this.findArrayIndex(sourceIndex);
        const arrayTargetIndex = this.findArrayIndex(targetIndex);
        this.throwIfIndexNotValid(arrayTargetIndex);

        this.removeRange(presetsToMove, presetsAreEqual);
        this.insertRange(arrayTargetIndex, presetsToMove);
        this.reIndexPresetsArray(arraySourceIndex, arrayTargetIndex, presetsToMove.length);
    }

    public swapPresets(presetsToSwap: Preset[], targetIndex: ModelPreset.PresetIndex) {
        if (presetsToSwap.length === 0) { return; }
        const sourceIndex = minPresetIndex(presetsToSwap);
        const arraySourceIndex = this.findArrayIndex(sourceIndex);
        const reindexIndex = this.findArrayIndex(targetIndex);

        this.removeRange(presetsToSwap, presetsAreEqual);
        const arrayTargetIndex = this.findArrayIndex(targetIndex);
        this.throwIfIndexNotValid(arrayTargetIndex);

        const swappedPresets = this.mutable.splice(arrayTargetIndex, presetsToSwap.length, ...presetsToSwap);
        this.insertRange(arraySourceIndex, swappedPresets);
        this.reIndexPresetsArray(arraySourceIndex, reindexIndex, presetsToSwap.length);
    }

    public delete(presetsToDelete: Preset[]) {
        this.removeRange(presetsToDelete);
        this.reIndexPresets();
        presetsToDelete.forEach(p => {
            this.add(PresetBuilder.delete(p, ToBeDeletedPreset));
        });
    }

    public acceptChanges() {
        this.mutable
            .filter(presetHasChanged)
            .forEach(p => {
                const pb = new PresetBuilder(p);
                pb.acceptChanges();
                this.mutable[p.index] = pb.detach();
            });
    }

    public reIndexPresets() {
        let index = 0;
        for (let i = 0; i < this.mutable.length; i++) {
            const p = this.mutable[i];
            if (!this.isDeleted(p)) {
                this.mutable[i] = PresetBuilder.modify(p, { index: index });
                index++;
            }
        }
    }

    private reIndexPresetsArray(startIndex: number, endIndex: number, count: number) {
        this.throwIfIndexNotValid(startIndex);
        this.throwIfIndexNotValid(endIndex);
        const min = Math.min(startIndex, endIndex);
        const max = Math.max(startIndex, endIndex) + count - 1;

        for (let index = min; index <= max; index++) {
            const p = this.mutable[index];
            if (p.index !== index) {
                this.mutable[index] = PresetBuilder.modify(p, { index: index });
            }
        }
    }

    private findArrayIndex(presetIndex: ModelPreset.PresetIndex): number {
        return this.mutable.findIndex(p => p.index === presetIndex);
    }

    private isDeleted(preset: Preset): boolean {
        return preset.ui.markedDeleted || preset.index < 0;
    }
}