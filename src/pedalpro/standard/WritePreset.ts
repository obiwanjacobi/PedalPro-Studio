import { ProtocolBuffer } from "../ProtocolBuffer";
import CommandBufferBuilder from "../CommandBufferBuilder";
import { PresetBufferParts } from "../Common";
import { PartSize } from "./Constants";
import { LastPartSize } from "../extended/ConstantsEx";
import PresetBuffer from "../PresetBuffer";
import PedalProDevice from "../PedalProDevice";

export default class WritePreset {
    private device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }
    
    public write(presetBuffer: PresetBuffer, presetIndex: number) {
        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferBuilder(buffer);

        let offset = builder.setWritePresetCmd(PresetBufferParts.Part1, PartSize, LastPartSize);
        buffer.write(offset, presetBuffer.data, 0, PartSize);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        offset = builder.setWritePresetCmd(PresetBufferParts.Part2, PartSize, LastPartSize);
        buffer.write(offset, presetBuffer.data, PartSize, PartSize);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        offset = builder.setWritePresetCmd(PresetBufferParts.Part3, PartSize, LastPartSize);
        buffer.write(offset, presetBuffer.data, PartSize + PartSize, PartSize);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        builder.setSavePresetCmd(presetIndex);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);
    }

    private throwIfCommandFailed(buffer: ProtocolBuffer) {
        if (!buffer.isCommandSuccess(this.device.read())) {
            throw new Error("Device communication fault.");
        }
    }
}