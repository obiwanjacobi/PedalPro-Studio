import PresetCommands from "../standard/PresetCommands";
import { ProtocolBuffer } from "../ProtocolBuffer";
import DeviceBuffer from "./DeviceBuffer";
import PedalProDevice from "../PedalProDevice";
import PresetBuffer from "../PresetBuffer";

export default class DeviceBufferAccessor {
    private readonly commands: PresetCommands;
    private readonly deviceBuffer: DeviceBuffer;
    private readonly preparedPages: number[];

    public constructor(device: PedalProDevice, deviceBuffer: DeviceBuffer) {
        this.deviceBuffer = deviceBuffer;
        this.deviceBuffer.clear();
        this.commands = new PresetCommands(device);
        this.preparedPages = new Array<number>();
    }
    
    public saveDirtyPages() {
        const buffer = new ProtocolBuffer();
        for (let i = 0; i < this.preparedPages.length; i++) {
            const page = this.preparedPages[i];

            buffer.clear();
            this.deviceBuffer.readPage(page, buffer);
            this.commands.write(buffer, page);
        }
    }

    public write(buffer: PresetBuffer, presetIndex: number): void {
        this.prepare(presetIndex);
        this.deviceBuffer.writePreset(presetIndex, buffer);
    }

    public read(presetIndex: number, buffer: PresetBuffer): void {
        this.prepare(presetIndex);
        this.deviceBuffer.readPreset(presetIndex, buffer);
    }

    public readAll() {
        const buffer = new ProtocolBuffer();

        for (let page = 0; page < this.deviceBuffer.pageCount; page++) {
            this.preparedPages.push(page);

            buffer.clear();
            this.commands.read(page, buffer);
            this.deviceBuffer.writePage(page, buffer);
        }
    }

    private prepare(presetIndex: number) {
        const pages = this.getEpromPages(presetIndex);
        const buffer = new ProtocolBuffer();

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            this.preparedPages.push(page);

            buffer.clear();
            this.commands.read(page, buffer);
            this.deviceBuffer.writePage(page, buffer);
        }
    }

    private getEpromPages(presetIndex: number): number[] {
        const pages = this.deviceBuffer.presetToEpromPages(presetIndex);
        return pages.filter((p) => this.preparedPages.indexOf(p) === -1);
    }
}