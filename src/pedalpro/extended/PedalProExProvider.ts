import PedalProDevice from "../PedalProDevice";
import Preset from "../../model/Preset";
import { PresetCount, PresetBufferSize } from "./ConstantsEx";
import PresetDeserializerEx from "./PresetDeserializerEx";
import PresetSerializerEx from "../extended/PresetSerializerEx";
import PresetBuffer from "../PresetBuffer";
import LogicalTransformerEx from "./LogicalTransformerEx";
import { DeviceProfile } from "../CommonPresetProvider";
import DeviceBuffer from "./DeviceBuffer";
import DeviceBufferAccessor from "./DeviceBufferAccessor";
import PedalProProvider from "../standard/PedalProProvider";

const DeviceExProfile: DeviceProfile = {
    presetCount: PresetCount,
    presetBufferSize: PresetBufferSize,
};

export default class PedalProExProvider extends PedalProProvider {
    private readonly deviceBuffer: DeviceBuffer;

    public constructor(device: PedalProDevice) {
        super(device, DeviceExProfile);
        this.deviceBuffer = new DeviceBuffer(this.profile.presetCount);
    }

    public putPreset(preset: Preset) {
        this.throwIfNotValidPresetIndex(preset.index);

        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        this.serialize(buffer, preset);

        const accessor = new DeviceBufferAccessor(this.commands, this.deviceBuffer);
        accessor.write(buffer, preset.index);
        accessor.saveDirtyPages();
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

    protected serialize(buffer: PresetBuffer, preset: Preset): void {
        LogicalTransformerEx.presetFromLogical(preset);
        const serializer = new PresetSerializerEx();
        serializer.serialize(buffer, preset);
    }

    protected deserialize(buffer: PresetBuffer): Preset {
        const deserializer = new PresetDeserializerEx();
        const preset = deserializer.deserialize(buffer);
        LogicalTransformerEx.presetToLogical(preset);
        return preset;
    }
}