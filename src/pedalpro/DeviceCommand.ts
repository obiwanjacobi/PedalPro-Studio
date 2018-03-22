import PedalProDevice from "./PedalProDevice";
import { ProtocolBuffer } from "./ProtocolBuffer";
import DataBuffer from "./DataBuffer";
import CommandBufferBuilder from "./CommandBufferBuilder";

const PartSize = 0x39;
const LastPartSize = 0x0E;

export default class DeviceCommand {
    protected readonly device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(epromPage: number, data: DataBuffer): void {
        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferBuilder(buffer);

        builder.setLoadPresetCmd(epromPage);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);
        
        const readBuffer = (offset: number, length: number) => {
            builder.setReadPresetCmd(offset, length);
            this.device.write(buffer);
            data.write(offset, this.device.read(), 1, length);
        };

        readBuffer(0, PartSize);
        readBuffer(PartSize, PartSize);
        readBuffer(PartSize * 2, LastPartSize);
    }

    public write(data: DataBuffer, epromPage: number) {
        const buffer = new ProtocolBuffer();
        const builder = new CommandBufferBuilder(buffer);

        const writeBuffer = (offset: number, length: number) => {
            const offsetInBuffer = builder.setWritePresetCmd(offset, length);
            buffer.write(offsetInBuffer, data.data, offset, length);
            
            this.device.write(buffer);
            this.throwIfCommandFailed(buffer);
        };

        writeBuffer(0, PartSize);
        writeBuffer(PartSize, PartSize);
        writeBuffer(PartSize * 2, LastPartSize);

        builder.setSavePresetCmd(epromPage);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);
    }

    protected throwIfCommandFailed(buffer: ProtocolBuffer) {
        if (!buffer.isCommandSuccess(this.device.read())) {
            throw new Error("Device communication fault.");
        }
    }
}