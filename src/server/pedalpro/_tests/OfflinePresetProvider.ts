import { PresetBuffer } from "../PresetBuffer";
import { PedalProDeviceModel } from "../PedalProDeviceIdentity";
import { FactoryProvider } from "../standard/FactoryProvider";
import { EmptyPresetBuffer } from "../standard/EmptyPresetBuffer";
import { PresetDeserializer } from "../standard/PresetDeserializer";
import { LogicalTransformer } from "../standard/LogicalTransformer";
import { PresetMeta } from "../../../model/PresetMeta";
import { Preset } from "../../../model/Preset";

export class OfflinePresetProvider extends FactoryProvider {
    public constructor(path: string) {
        super(path);
    }

    public deletePreset(presetIndex: number): Preset {
        this.throwIfNotValidPresetIndex(presetIndex);
        const empty = this.deserialize(EmptyPresetBuffer);
        empty.index = presetIndex;
        super.setPreset(empty);
        return empty;
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

    public getEmptyPreset(): Preset {
        return this.deserialize(EmptyPresetBuffer);
    }

    protected deserialize(buffer: PresetBuffer): Preset {
        const deserializer = new PresetDeserializer();
        const preset = deserializer.deserialize(buffer);
        LogicalTransformer.presetToLogical(preset);
        preset.meta = this.createMeta();
        return preset;
    }

    private createMeta(): PresetMeta {
        return { device: PedalProDeviceModel.PedalPro.toString() }; // standard
    }
}