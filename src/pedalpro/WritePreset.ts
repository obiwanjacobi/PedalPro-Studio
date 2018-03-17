import { ProtocolBuffer } from "./ProtocolBuffer";
import CommandBufferBuilder from "./CommandBufferBuilder";
import { PresetBufferParts } from "./Common";
import PresetBuffer from "./PresetBuffer";
import PedalProDevice from "./PedalProDevice";
import DeviceCommand, { DeviceProfile } from "./DeviceCommand";

export default class WritePreset extends DeviceCommand {
    public constructor(device: PedalProDevice, profile: DeviceProfile) {
        super(device, profile);
    }
    
    public write(presetBuffer: PresetBuffer, presetIndex: number) {
        const buffer = new ProtocolBuffer(this.profile.presetBufferSize);
        const builder = new CommandBufferBuilder(buffer);

        let offset = builder.setWritePresetCmd(
            PresetBufferParts.Part1, this.profile.partSize, this.profile.lastPartSize);
        buffer.write(offset, presetBuffer.data, 0, this.profile.partSize);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        offset = builder.setWritePresetCmd(
            PresetBufferParts.Part2, this.profile.partSize, this.profile.lastPartSize);
        buffer.write(offset, presetBuffer.data, this.profile.partSize, this.profile.partSize);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        offset = builder.setWritePresetCmd(
            PresetBufferParts.Part3, this.profile.partSize, this.profile.lastPartSize);
        buffer.write(
            offset, presetBuffer.data, this.profile.partSize + this.profile.partSize, this.profile.lastPartSize);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        builder.setSavePresetCmd(presetIndex);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);
    }   
}