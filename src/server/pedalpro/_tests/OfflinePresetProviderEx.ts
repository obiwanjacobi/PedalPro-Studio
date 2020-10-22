import { PresetBuffer } from "../PresetBuffer";
import { PedalProDeviceModel } from "../PedalProDeviceIdentity";
import { FactoryProviderEx } from "../extended/FactoryProviderEx";
import { EmptyPresetBufferEx } from "../extended/EmptyPresetBufferEx";
import { PresetDeserializerEx } from "../extended/PresetDeserializerEx";
import { LogicalTransformerEx } from "../extended/LogicalTransformerEx";
import { PresetMeta } from "../../../model/PresetMeta";
import { Preset } from "../../../model/Preset";

export class OfflinePresetProviderEx extends FactoryProviderEx {
    public constructor(path: string) {
        super(path);
    }

    public deletePreset(presetIndex: number): Preset {
        this.throwIfNotValidPresetIndex(presetIndex);
        const empty = this.deserialize(EmptyPresetBufferEx);
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
        return this.deserialize(EmptyPresetBufferEx);
    }

    protected deserialize(buffer: PresetBuffer): Preset {
        const deserializer = new PresetDeserializerEx();
        const preset = deserializer.deserialize(buffer);
        LogicalTransformerEx.presetToLogical(preset);
        preset.meta = this.createMeta();
        return preset;
    }

    private createMeta(): PresetMeta {
        return { device: PedalProDeviceModel.PedalProEx.toString() }; // Ex
    }
}