import { clone, cloneDeep } from "lodash";

import { Preset } from "./Preset";
import * as ModelPreset from "../../model/Preset";
import { ArrayBuilder, ItemBuilder, CopyOption, MatchItemFn, ItemFn } from "../StateBuilder";
import { itemUiModify } from "../ItemUI";
import { presetsAreEqual, presetHasChanged, minPresetIndex } from "./PresetOperations";

export class PresetBuilder extends ItemBuilder<Preset> {
    public static modify(preset: Preset, update: Partial<Preset>): Preset {
        return { ...preset, ...update };
    }

    public static delete(preset: Preset, empty: ModelPreset.Preset) {
        return { ...preset, ...empty, ui: itemUiModify(preset.ui, { markedDeleted: false })};
    }

    public static toModel(preset: Preset): ModelPreset.Preset {
        return { 
            effects: preset.effects, 
            index: preset.index, 
            name: preset.name, 
            meta: preset.meta, 
            traits: preset.traits };
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

    public reIndexPresets(startIndex: number, endIndex: number) {
        this.throwIfIndexNotValid(startIndex);
        this.throwIfIndexNotValid(endIndex);
        const min = Math.min(startIndex, endIndex);
        const max = Math.max(startIndex, endIndex);

        for (let index = min; index <= max; index++) {
            this.mutable[index] = PresetBuilder.modify(this.mutable[index], { index: index });
        }
    }

    public movePresets(presetsToMove: Preset[], targetIndex: number) {
        if (presetsToMove.length === 0) { return; }
        this.throwIfIndexNotValid(targetIndex);

        const sourceIndex = minPresetIndex(presetsToMove);
        const arrayTargetIndex = this.findArrayIndex(targetIndex);

        this.removeRange(presetsToMove, presetsAreEqual);
        this.insertRange(arrayTargetIndex, presetsToMove);
        this.reIndexPresets(sourceIndex, targetIndex + presetsToMove.length - 1);
    }

    public swapPresets(presetsToSwap: Preset[], targetIndex: number) {
        if (presetsToSwap.length === 0) { return; }
        this.throwIfIndexNotValid(targetIndex);
        
        const sourceIndex = minPresetIndex(presetsToSwap);
        const arrayTargetIndex = this.findArrayIndex(targetIndex);

        this.removeRange(presetsToSwap, presetsAreEqual);
        const swappedPresets = this.mutable.splice(arrayTargetIndex, presetsToSwap.length, ...presetsToSwap);
        this.insertRange(sourceIndex, swappedPresets);
        this.reIndexPresets(sourceIndex, targetIndex + presetsToSwap.length - 1);
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

    private findArrayIndex(presetIndex: number): number {
        return this.mutable.findIndex(p => p.index === presetIndex);
    }
}