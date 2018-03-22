import PedalProDevice from "../PedalProDevice";
import Preset from "../../model/Preset";
import { PresetCount, PresetBufferSize } from "./ConstantsEx";
import PresetDeserializerEx from "./PresetDeserializerEx";
import PresetSerializerEx from "../extended/PresetSerializerEx";
import PresetBuffer from "../PresetBuffer";
import LogicalTransformerEx from "./LogicalTransformerEx";
import PresetProvider, { DeviceProfile } from "../../server/PresetProvider";
import DeviceBuffer from "./DeviceBuffer";
import DeviceBufferAccessor from "./DeviceBufferAccessor";

const DeviceExProfile: DeviceProfile = {
    presetCount: PresetCount,
    presetBufferSize: PresetBufferSize
};

export default class PedalProExProvider extends PresetProvider {
    private readonly deviceBuffer: DeviceBuffer;
    private readonly device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        super(DeviceExProfile);
        this.device = device;
        this.deviceBuffer = new DeviceBuffer(this.profile.presetCount);
    }

    public putPreset(preset: Preset) {
        this.throwIfNotValidPresetIndex(preset.index);

        const accessor = new DeviceBufferAccessor(this.device, this.deviceBuffer);
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        this.serialize(buffer, preset);
        accessor.write(buffer, preset.index);
        accessor.saveDirtyPages();
    }

    public putPresets(presets: Preset[]) {
        const accessor = new DeviceBufferAccessor(this.device, this.deviceBuffer);
        const buffer = new PresetBuffer(this.profile.presetBufferSize);

        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];

            this.throwIfNotValidPresetIndex(preset.index);
            this.serialize(buffer, preset);
            accessor.write(buffer, preset.index);
        }
        
        accessor.saveDirtyPages();
    }

    public getPreset(presetIndex: number): Preset {
        this.throwIfNotValidPresetIndex(presetIndex);

        const accessor = new DeviceBufferAccessor(this.device, this.deviceBuffer);
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        accessor.read(presetIndex, buffer);
        const preset = this.deserialize(buffer);
        preset.index = presetIndex;
        return preset;
    }

    public getPresets(): Preset[] {
        const presets = this.allPresets();
        return presets.filter((p) => !p.traits.empty);
    }

    public allPresets(): Preset[] {
        const accessor = new DeviceBufferAccessor(this.device, this.deviceBuffer);
        accessor.readAll();

        const presets = new Array<Preset>(this.profile.presetCount);
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        for (let index = 0; index < this.deviceBuffer.presetCount; index++) {
            this.deviceBuffer.readPreset(index, buffer);
            presets[index] = this.deserialize(buffer);
            presets[index].index = index;
        }

        return presets;
    }

    private serialize(buffer: PresetBuffer, preset: Preset): void {
        LogicalTransformerEx.presetFromLogical(preset);
        const serializer = new PresetSerializerEx();
        serializer.serialize(buffer, preset);
    }

    private deserialize(buffer: PresetBuffer): Preset {
        const deserializer = new PresetDeserializerEx();
        const preset = deserializer.deserialize(buffer);
        LogicalTransformerEx.presetToLogical(preset);
        return preset;
    }
}