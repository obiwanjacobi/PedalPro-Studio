import PedalProDevice from "../PedalProDevice";
import { ProtocolBuffer } from "../ProtocolBuffer";
import PresetBufferEx from "./PresetBufferEx";
import CommandBufferBuilder from "../CommandBufferBuilder";
import { PresetBufferParts } from "../Common";
import { PartSize, LastPartSize } from "./ConstantsEx";

export default class ReadPreset {
    private device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(presetIndex: number): PresetBufferEx {
        if (!this.device.isConnected) { this.device.connect(); }

        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferBuilder(buffer);
        builder.setLoadPresetCmd(presetIndex);
        this.device.write(buffer);

        this.device.read();
        const preset = new PresetBufferEx();
        
        builder.setReadPresetCmd(PresetBufferParts.Part1, PartSize, LastPartSize);
        this.device.write(buffer);
        preset.write(0, this.device.read(), 1, PartSize);

        builder.setReadPresetCmd(PresetBufferParts.Part2, PartSize, LastPartSize);
        this.device.write(buffer);
        preset.write(PartSize, this.device.read(), 1, PartSize);

        builder.setReadPresetCmd(PresetBufferParts.Part3, PartSize, LastPartSize);
        this.device.write(buffer);
        preset.write(PartSize + PartSize, this.device.read(), 1, LastPartSize);

        return preset;
    }
}