export const PartSize = 0x39;
export const LastPartSize = 0x0D;
const ProtocolBufferSize = 65;

export enum BufferParts {
    Part1,
    Part2,
    Part3,
    LastPart = Part3
}

export class ProtocolBuffer {
    
    public data: number[];

    public constructor(byteCount: number = ProtocolBufferSize) {
        this.data = new Array(byteCount);
        this.clear();
    }

    public clear() {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = 0;
        }
    }

    public get command(): number {
        if (this.data.length < 2) { return 0; }
        return this.data[1];
    }

    public write(offset: number, source: number[], srcOffset: number, length: number): number {
        if (offset > this.data.length) { return 0; }
        if (srcOffset > source.length) { return 0; }
        if (srcOffset + length > source.length) { length = source.length - srcOffset; }
        if (offset + length > this.data.length) { length = this.data.length - offset; }

        for (let i = 0; i < length; i++) {
            this.data[offset + i] = source[srcOffset + i];
        }

        return length;
    }

    public read(offset: number, target: number[], trgOffset: number, length: number): number {
        if (offset > this.data.length) { return 0; }
        if (trgOffset > target.length) { return 0; }
        if (offset + length > this.data.length) { length = this.data.length - offset; }
        if (trgOffset + length > target.length) { length = target.length - trgOffset; }

        for (let i = 0; i < length; i++) {
            target[trgOffset + i] = this.data[offset + i];
        }

        return length;
    }

    public formatData(offset: number = 0): string {
        const hex = new Array<string>(this.data.length - offset);

        for (let i = offset; i < this.data.length; i++) {
            hex[i - offset] = this.data[i].toString(16);
        }

        return hex.join(",");
    }

    /** Prepares the buffer for the read-preset command 
     *  that brings in the preset data from the external memory 
     *  into the MCU memory. The preset is NOT selected as current.
     */
    public setLoadPresetCmd(presetIndex: number) {
        this.clear();
        this.data[1] = 0x16;    // read-preset command
        this.data[3] = presetIndex / 256;
        this.data[4] = presetIndex % 256;
    }

    /** Prepares the buffer for the load-preset command
     *  that sends the preset data in the MCU memory over 
     *  the USB wire.
     */
    public setReadPresetCmd(bufferIndex: BufferParts) {
        this.clear();
        this.data[1] = 0x17;    // load-preset command
        this.data[5] = bufferIndex === BufferParts.LastPart ? LastPartSize : PartSize;
        this.data[6] = bufferIndex * PartSize;
    }

    /**
     * Prepares the buffer for the read-vut command
     * that returns device identifiaction data.
     */
    public setVintageUnitTypeCmd() {
        this.clear();
        this.data[1] = 0x22;    // read vut command
        // this.data[2] = 0;       // payload
        // this.data[3] = 0x00;    // address hi
        this.data[4] = 0x10;    // address lo
    }

    /**
     * Prepares the buffer for read-vut command for the master FW 
     * that serves as a verion identification for the device.
     */
    public setMasterVersionCmd() {
        this.clear();
        this.data[1] = 0x22;    // read vut command
        // this.data[2] = 0;       // payload
        this.data[3] = 0x7F;    // address hi
        this.data[4] = 0x40;    // address lo
    }
}