import DataBuffer from "../DataBuffer";

const MaxPresetCount = 500;
const EpromPageSize = 128;
const DeviceBufferSize = MaxPresetCount * EpromPageSize;

export class EpromPageBuffer extends DataBuffer {
    public constructor() {
        super(EpromPageSize);
    }
}

export default class DeviceBuffer extends DataBuffer {
    public readonly presetCount: number;
    public readonly pageCount: number = 500;
    public readonly presetLength: number;

    public constructor(presetCount: number) {
        super(DeviceBufferSize);

        if (presetCount > MaxPresetCount) { 
            throw new RangeError("Unsupported preset count.");
        }

        this.presetCount = presetCount;
        this.presetLength = Math.ceil(DeviceBufferSize / this.presetCount);
    }

    public writePreset(presetIndex: number, buffer: DataBuffer) {
        buffer.throwIfNotOfLength(this.presetLength);
        const offset = this.presetIndexToOffset(presetIndex);
        this.write(offset, buffer.data, 0, buffer.data.length);
    }

    // public readPreset(presetIndex: number, buffer: DataBuffer) {
    //     buffer.throwIfNotOfLength(this.presetLength);
    //     const offset = this.presetIndexToOffset(presetIndex);
    //     this.read(offset, buffer.data, 0, buffer.data.length);
    // }

    public writePage(epromPage: number, buffer: DataBuffer) {
        buffer.throwIfNotOfLength(EpromPageSize);
        const offset = this.epromPageToOffset(epromPage);
        this.write(offset, buffer.data, 0, buffer.data.length);
    }

    public readPage(epromPage: number, buffer: DataBuffer) {
        buffer.throwIfNotOfLength(EpromPageSize);
        const offset = this.epromPageToOffset(epromPage);
        this.read(offset, buffer.data, 0, buffer.data.length);
    }

    // public clearPage(epromPage: number) {
    //     const offset = epromPage * EpromPageSize;
    //     for (let i = 0; i < EpromPageSize; i++) {
    //         this.data[i + offset] = 0;
    //     }
    // }

    public presetIndexToOffset(presetIndex: number): number {
        return presetIndex * this.presetLength;
    }

    public presetToEpromPages(preset: number): number[] {
        if (this.presetCount === MaxPresetCount) { return [preset]; }

        const pages = new Array<number>();
        this.presetToEpromPagesInternal(pages, preset);

        // remove duplicates and sort
        return pages.filter((v, i, a) => a.indexOf(v) === i).sort();
    }

    private epromPageToOffset(page: number): number {
        return page * EpromPageSize;
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