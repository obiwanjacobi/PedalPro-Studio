import { PedalProDevice } from "../PedalProDevice";
import { Preset } from "../../../model/Preset";
import { PresetDeserializerEx } from "./PresetDeserializerEx";
import { PresetSerializerEx } from "./PresetSerializerEx";
import { PresetBuffer } from "../PresetBuffer";
import { LogicalTransformerEx } from "./LogicalTransformerEx";
import { DeviceExProfile } from "./DeviceExProfile";
import { DeviceBuffer } from "./DeviceBuffer";
import { DeviceBufferAccessor } from "./DeviceBufferAccessor";
import { PedalProProvider } from "../standard/PedalProProvider";
import { PedalProDeviceIdentity } from "../PedalProDeviceIdentity";
import { EmptyPresetBufferEx } from "./EmptyPresetBufferEx";

export class PedalProExProvider extends PedalProProvider {
    private readonly deviceBuffer: DeviceBuffer;

    public constructor(device: PedalProDevice, identity: PedalProDeviceIdentity) {
        super(device, identity, DeviceExProfile);
        this.deviceBuffer = new DeviceBuffer(this.profile.presetCount);
    }

    public deletePreset(presetIndex: number): Preset {
        this.throwIfNotValidPresetIndex(presetIndex);

        this.writePresetBuffer(EmptyPresetBufferEx, presetIndex);
        return this.deserialize(EmptyPresetBufferEx);
    }

    public putPreset(preset: Preset) {
        this.throwIfNotValidPresetIndex(preset.index);

        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        this.serialize(buffer, preset);

        this.writePresetBuffer(buffer, preset.index);
    }

    public putPresets(presets: Preset[]) {
        const accessor = new DeviceBufferAccessor(this.commands, this.deviceBuffer);
        const buffer = new PresetBuffer(this.profile.presetBufferSize);

        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];

            this.throwIfNotValidPresetIndex(preset.index);
            this.serialize(buffer, preset);
            accessor.write(buffer, preset.index);
        }
        
        accessor.saveDirtyPages();
    }

    public getEmptyPreset(): Preset {
        return this.deserialize(EmptyPresetBufferEx);
    }

    protected serialize(buffer: PresetBuffer, preset: Preset): void {
        LogicalTransformerEx.presetFromLogical(preset);
        const serializer = new PresetSerializerEx();
        serializer.serialize(buffer, preset);
    }

    protected deserialize(buffer: PresetBuffer): Preset {
        const deserializer = new PresetDeserializerEx();
        const preset = deserializer.deserialize(buffer);
        LogicalTransformerEx.presetToLogical(preset);
        preset.meta = this.createMeta();
        return preset;
    }

    private writePresetBuffer(buffer: PresetBuffer, index: number) {
        const accessor = new DeviceBufferAccessor(this.commands, this.deviceBuffer);
        accessor.write(buffer, index);
        accessor.saveDirtyPages();
    }
}