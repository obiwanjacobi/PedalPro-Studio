import { Preset } from "./Preset";
import { ArrayBuilder, ItemBuilder } from "./StateBuilder";

export class PresetBuilder extends ItemBuilder<Preset> {
    public static modify(preset: Preset, update: Partial<Preset>): Preset {
        return { ...preset, ...update };
    }

    public constructor(state: Preset) {
        super();
        this.state = { ...state };
    }
}

export class PresetArrayBuilder extends ArrayBuilder<Preset> {
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