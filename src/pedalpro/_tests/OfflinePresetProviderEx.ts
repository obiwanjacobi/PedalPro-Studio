import { FactoryProviderEx } from "../extended/FactoryProviderEx";
import { Preset } from "../../model/Preset";

export class OfflinePresetProviderEx extends FactoryProviderEx {
    public constructor(path: string) {
        super(path);
    }

    public putPreset(preset: Preset) {
        this.throwIfNotValidPresetIndex(preset.index);
        super.setPreset(preset);
    }

    public putPresets(presets: Preset[]) {
        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];

            this.throwIfNotValidPresetIndex(preset.index);
            super.setPreset(preset);
        }
    }
}