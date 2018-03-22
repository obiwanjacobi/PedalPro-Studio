import DataBuffer from "../DataBuffer";
import Convert from "../Convert";

const NominalPresetCount = 500;
const EpromPageSize = 128;
const DeviceBufferSize = NominalPresetCount * EpromPageSize;

export default class DeviceBuffer extends DataBuffer {
    public readonly presetCount: number;
    public readonly pageCount: number = 500;
    private readonly presetLength: number;

    public constructor(presetCount: number = NominalPresetCount) {
        super(DeviceBufferSize);
        this.presetCount = presetCount;
        this.presetLength = Math.floor(DeviceBufferSize / this.presetCount);

        if (presetCount < NominalPresetCount) { 
            throw new Error("Unsupported preset count.");
        }
    }

    public writePreset(presetIndex: number, buffer: DataBuffer) {
        const offset = this.presetIndexToOffset(presetIndex);
        this.write(offset, buffer.data, 0, buffer.data.length);
    }

    public readPreset(presetIndex: number, buffer: DataBuffer) {
        const offset = this.presetIndexToOffset(presetIndex);
        this.read(offset, buffer.data, 0, buffer.data.length);
    }

    public writePage(epromPage: number, buffer: DataBuffer) {
        this.write(epromPage * EpromPageSize, buffer.data, 0, buffer.data.length);
    }

    public readPage(epromPage: number, buffer: DataBuffer) {
        this.read(epromPage * EpromPageSize, buffer.data, 0, buffer.data.length);
    }

    public clearPage(epromPage: number) {
        const offset = epromPage * EpromPageSize;
        
        for (let i = 0; i < EpromPageSize; i++) {
            this.data[i + offset] = 0;
        }
    }

    public presetIndexToOffset(presetIndex: number): number {
        return Convert.transformRange(presetIndex, 0, this.presetCount - 1, 0, 499 * EpromPageSize);
    }

    public presetToEpromPages(preset: number): number[] {
        if (this.presetCount === NominalPresetCount) { return [preset]; }

        const pages = new Array<number>();
        this.presetToEpromPagesInternal(pages, preset);

        // remove duplicates and sort
        return pages.filter((v, i, a) => a.indexOf(v) === i).sort();
    }

    public presetsToEpromPages(presets: number[]): number[] {
        if (this.presetCount === NominalPresetCount) { return  presets; }

        const pages = new Array<number>();
        for (let i = 0; i < presets.length; i++) {
            this.presetToEpromPagesInternal(pages, presets[i]);
        }

        // remove duplicates and sort
        return pages.filter((v, i, a) => a.indexOf(v) === i).sort();
    }

    private presetToEpromPagesInternal(pages: number[], presetIndex: number) {
        const offset = this.presetIndexToOffset(presetIndex);
        const start = Math.floor(offset / EpromPageSize);
        const end = Math.floor((offset + this.presetLength) / EpromPageSize);

        // add all between start and end
        for (let p = start; p <= end; p++) {
            pages.push(p);
        }
    }
}