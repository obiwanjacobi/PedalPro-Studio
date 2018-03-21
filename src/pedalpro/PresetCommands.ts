import PedalProDevice from "./PedalProDevice";
import { ProtocolBuffer } from "./ProtocolBuffer";
import PresetBuffer from "./PresetBuffer";
import CommandBufferBuilder from "./CommandBufferBuilder";
import { PresetBufferParts } from "./Common";
import DeviceCommand, { DeviceProfile } from "./DeviceCommand";

export default class PresetCommands extends DeviceCommand {
    public constructor(device: PedalProDevice, profile: DeviceProfile) {
        super(device, profile);
    }

    public read(presetIndex: number): PresetBuffer {
        if (!this.device.isConnected) { this.device.connect(); }

        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferBuilder(buffer);
        builder.setLoadPresetCmd(presetIndex);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);

        const preset = new PresetBuffer(this.profile.presetBufferSize);
        
        builder.setReadPresetCmd(PresetBufferParts.Part1, this.profile.partSize, this.profile.lastPartSize);
        this.device.write(buffer);
        preset.write(0, this.device.read(), 1, this.profile.partSize);

        builder.setReadPresetCmd(PresetBufferParts.Part2, this.profile.partSize, this.profile.lastPartSize);
        this.device.write(buffer);
        preset.write(this.profile.partSize, this.device.read(), 1, this.profile.partSize);

        builder.setReadPresetCmd(PresetBufferParts.Part3, this.profile.partSize, this.profile.lastPartSize);
        this.device.write(buffer);
        preset.write(this.profile.partSize + this.profile.partSize, this.device.read(), 1, this.profile.lastPartSize);

        return preset;
    }

    public write(preset: PresetBuffer, presetIndex: number) {
        if (!this.device.isConnected) { this.device.connect(); }

        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferBuilder(buffer);

        const writeBuffer = (offset: number, length: number) => {
            const offsetInBuffer = builder.setWritePresetCmd(offset, length);
            buffer.write(offsetInBuffer, preset.data, offset, length);
            
            this.device.write(buffer);
            this.throwIfCommandFailed(buffer);
        };

        writeBuffer(0, this.profile.partSize);
        writeBuffer(this.profile.partSize, this.profile.partSize);
        writeBuffer(this.profile.partSize * 2, this.profile.lastPartSize);

        builder.setSavePresetCmd(presetIndex);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);
    }
}