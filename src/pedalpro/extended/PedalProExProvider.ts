import PedalProDevice from "../PedalProDevice";
import PedalProProvider from "../standard/PedalProProvider";
import Preset from "../../model/Preset";

import { PresetCount, PresetBufferSize, PartSize, LastPartSize } from "./ConstantsEx";
import PresetDeserializerEx from "./PresetDeserializerEx";
import PresetSerializerEx from "../extended/PresetSerializerEx";
import { DeviceProfile } from "../DeviceCommand";
import PresetBuffer from "../PresetBuffer";
import LogicalTransformerEx from "./LogicalTransformerEx";

const DeviceExProfile: DeviceProfile = {
    presetCount: PresetCount,
    presetBufferSize: PresetBufferSize,
    partSize: PartSize,
    lastPartSize: LastPartSize
};

export default class PedalProExProvider extends PedalProProvider {
    public constructor(device: PedalProDevice) {
        super(device, DeviceExProfile);
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