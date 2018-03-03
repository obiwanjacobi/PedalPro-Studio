import PedalProDevice from "../PedalProDevice";
import { ProtocolBuffer, BufferParts, PartSize, LastPartSize } from "../ProtocolBuffer";
import PedalProPresetBuffer from "./PedalProPresetBuffer";

export default class PedalProReadPreset {
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

    public read(presetIndex: number): PedalProPresetBuffer {
        if (!this.device.isConnected) { this.device.connect(); }
        PedalProDevice.throwIfNotValidPresetIndex(presetIndex);

        const buffer = new ProtocolBuffer();
        buffer.setLoadPresetCmd(presetIndex);
        this.device.write(buffer);

        this.device.read();
        // if (!PedalProReadPreset.isCommandDone(buffer.command, await this.device.read())) {
        //     throw new Error("PedalPro Command failed.");
        // }

        const preset = new PedalProPresetBuffer();
        
        buffer.setReadPresetCmd(BufferParts.Part1);
        this.device.write(buffer);
        preset.write(0, this.device.read(), 1, PartSize);

        buffer.setReadPresetCmd(BufferParts.Part2);
        this.device.write(buffer);
        preset.write(PartSize, this.device.read(), 1, PartSize);

        buffer.setReadPresetCmd(BufferParts.Part3);
        this.device.write(buffer);
        preset.write(PartSize + PartSize, this.device.read(), 1, LastPartSize);

        return preset;
    }
}