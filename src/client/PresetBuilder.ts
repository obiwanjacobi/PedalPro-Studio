import { Preset, presetsExceptUiAreEqual } from "./Preset";
import * as ModelPreset from "../model/Preset";
import { ArrayBuilder, ItemBuilder, CopyOption, MatchItemFn, ItemFn } from "./StateBuilder";
import { ItemUiModify } from "./ItemUI";

export class PresetBuilder extends ItemBuilder<Preset> {
    public static modify(preset: Preset, update: Partial<Preset>): Preset {
        return { ...preset, ...update };
    }

    public static delete(preset: Preset, empty: ModelPreset.Preset) {
        return { ...preset, ...empty, ui: ItemUiModify(preset.ui, { markedDeleted: false })};
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
}

export class PresetArrayBuilder extends ArrayBuilder<Preset> {

    public forRange(these: Preset[], func: ItemFn<Preset>, matchFn: MatchItemFn<Preset> = presetsExceptUiAreEqual) {
        super.forRange(these, func, matchFn);
    }

    public forEach(func: ItemFn<Preset>) {
        for (let i = 0; i < this.mutable.length; i++) {
            func(this.mutable[i], i);
        }
    }

    public replaceByPresetIndex(replacements: Preset[]) {
        replacements.forEach(replacement => {
            const index = this.mutable.findIndex((p) => p.index === replacement.index);
            if (index !== -1) {
                this.mutable[index] = replacement;
            } else {
                this.mutable.push(replacement);
            }
        });
    }

    public reIndexPresets(presetIndex: number, startArrayIndex: number, endArrayIndex: number) {
        for (let indexPos = startArrayIndex; indexPos <= endArrayIndex; indexPos++) {
            this.mutable[indexPos] = PresetBuilder.modify(this.mutable[indexPos], { index: presetIndex });
            presetIndex++;
        }    
    }
}