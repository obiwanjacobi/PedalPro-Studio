import { DeviceBuffer, EpromPageBuffer } from "./DeviceBuffer";
import { PresetBuffer } from "../PresetBuffer";
import { DeviceCommands } from "../DeviceCommands";

export class DeviceBufferAccessor {
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

        const tempBuffer = new PresetBuffer(this.deviceBuffer.presetLength);
        const prevIndex = presetIndex - 1;
        const nextIndex = presetIndex + 1;

        // previous preset
        if (presetIndex > 0 &&
            this.preparedPresets.indexOf(prevIndex) === -1) {
            this.commands.read(prevIndex, tempBuffer);
            this.deviceBuffer.writePreset(prevIndex, tempBuffer);
            this.preparedPresets.push(prevIndex);
        }

        // request preset
        this.deviceBuffer.writePreset(presetIndex, buffer);
        if (this.preparedPresets.indexOf(presetIndex) === -1) {
            this.preparedPresets.push(presetIndex);
        }

        // next preset
        if (presetIndex < this.deviceBuffer.presetCount &&
            this.preparedPresets.indexOf(nextIndex) === -1) {
            tempBuffer.clear();
            this.commands.read(nextIndex, tempBuffer);
            this.deviceBuffer.writePreset(nextIndex, tempBuffer);
            this.preparedPresets.push(nextIndex);
        }

        const pages = this.getEpromPages(presetIndex);
        this.preparedPages.push(...pages);
    }

    private getEpromPages(presetIndex: number): number[] {
        const pages = this.deviceBuffer.presetToEpromPages(presetIndex);
        return pages.filter((p) => this.preparedPages.indexOf(p) === -1);
    }
}