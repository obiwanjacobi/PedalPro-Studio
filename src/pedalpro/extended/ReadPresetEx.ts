import PedalProDevice from "../PedalProDevice";
import { ProtocolBuffer } from "../ProtocolBuffer";
import PresetBufferEx from "./PresetBufferEx";
import CommandBufferExBuilder from "./CommandBufferExBuilder";
import { PartSize, LastPartSize, BufferParts } from "./ConstantsEx";
import PedalProProvider from "./PedalProExProvider";

export default class ReadPreset {
    private device: PedalProDevice;

    // private static isCommandDone(command: number, response: number[]): boolean {
    //     return response &&
    //         response.length >= 2 &&
    //         response[0] === command &&
    //         response[1] === 0x0F;    // done
    // }

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(presetIndex: number): PresetBufferEx {
        PedalProProvider.throwIfNotValidPresetIndex(presetIndex);
        if (!this.device.isConnected) { this.device.connect(); }

        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferExBuilder(buffer);
        builder.setLoadPresetCmd(presetIndex);
        this.device.write(buffer);

        this.device.read();
        // if (!PedalProReadPreset.isCommandDone(buffer.command, this.device.read())) {
        //     throw new Error("PedalPro Command failed.");
        // }

        const preset = new PresetBufferEx();
        
        builder.setReadPresetCmd(BufferParts.Part1);
        this.device.write(buffer);
        preset.write(0, this.device.read(), 1, PartSize);

        builder.setReadPresetCmd(BufferParts.Part2);
        this.device.write(buffer);
        preset.write(PartSize, this.device.read(), 1, PartSize);

        builder.setReadPresetCmd(BufferParts.Part3);
        this.device.write(buffer);
        preset.write(PartSize + PartSize, this.device.read(), 1, LastPartSize);

        return preset;
    }
}