import PedalProDevice from "./PedalProDevice";
import { ProtocolBuffer } from "./ProtocolBuffer";
import DataBuffer from "./DataBuffer";
import CommandBufferBuilder from "./CommandBufferBuilder";

const PartSize = 0x39;

export default class DeviceCommands {
    protected readonly device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(epromPage: number, data: DataBuffer): void {
        const lastPartSize = this.calcLastPartSize(data);
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
        readBuffer(PartSize * 2, lastPartSize);
    }

    public write(data: DataBuffer, epromPage: number) {
        const lastPartSize = this.calcLastPartSize(data);
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
        writeBuffer(PartSize * 2, lastPartSize);

        builder.setSavePresetCmd(epromPage);
        this.device.write(buffer);
        this.throwIfCommandFailed(buffer);
    }

    protected throwIfCommandFailed(buffer: ProtocolBuffer) {
        if (!buffer.isCommandSuccess(this.device.read())) {
            throw new Error("Device communication fault.");
        }
    }

    private calcLastPartSize(buffer: DataBuffer): number {
        const lastPartSize = buffer.data.length - (2 * PartSize);
        if (lastPartSize > PartSize) {return  PartSize; }
        return  lastPartSize;
    }
}