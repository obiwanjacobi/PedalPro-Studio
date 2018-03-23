import DeviceBuffer, { EpromPageBuffer } from "./DeviceBuffer";
import PresetBuffer from "../PresetBuffer";
import DeviceCommands from "../DeviceCommands";

export default class DeviceBufferAccessor {
    private readonly commands: DeviceCommands;
    private readonly deviceBuffer: DeviceBuffer;
    private readonly preparedPages: number[];
    private readonly preparedPresets: number[];

    public constructor(deviceCommands: DeviceCommands, deviceBuffer: DeviceBuffer) {
        this.deviceBuffer = deviceBuffer;
        this.deviceBuffer.clear();
        this.commands = deviceCommands;
        this.preparedPages = new Array<number>();
        this.preparedPresets = new Array<number>();
    }
    
    public saveDirtyPages() {
        const buffer = new EpromPageBuffer();
        for (let i = 0; i < this.preparedPages.length; i++) {
            const page = this.preparedPages[i];

            buffer.clear();
            this.deviceBuffer.readPage(page, buffer);
            this.commands.write(buffer, page);
        }
    }

    public write(buffer: PresetBuffer, presetIndex: number): void {
        buffer.throwIfNotOfLength(this.deviceBuffer.presetLength);

        this.prepare(presetIndex);
        this.deviceBuffer.writePreset(presetIndex, buffer);
    }

    private prepare(presetIndex: number) {
        const pages = this.getEpromPages(presetIndex);
        // means everything is already in place
        if (pages.length === 0) { return; }

        const buffer = new PresetBuffer(this.deviceBuffer.presetLength);

        // previous preset
        if (presetIndex > 0 &&
            this.preparedPresets.indexOf(presetIndex - 1) === -1) {
            this.commands.read(presetIndex - 1, buffer);
            this.deviceBuffer.writePreset(presetIndex - 1, buffer);
            this.preparedPresets.push(presetIndex - 1);
        }

        // request preset
        if (this.preparedPresets.indexOf(presetIndex) === -1) {
            buffer.clear();
            this.commands.read(presetIndex, buffer);
            this.deviceBuffer.writePreset(presetIndex, buffer);
            this.preparedPresets.push(presetIndex);
        }

        // next preset
        if (presetIndex < this.deviceBuffer.presetCount &&
            this.preparedPresets.indexOf(presetIndex + 1) === -1) {
            buffer.clear();
            this.commands.read(presetIndex + 1, buffer);
            this.deviceBuffer.writePreset(presetIndex + 1, buffer);
            this.preparedPresets.push(presetIndex + 1);
        }

        for (let i = 0; i < pages.length; i++) {
            this.preparedPages.push(pages[i]);
        }
    }

    private getEpromPages(presetIndex: number): number[] {
        const pages = this.deviceBuffer.presetToEpromPages(presetIndex);
        return pages.filter((p) => this.preparedPages.indexOf(p) === -1);
    }
}