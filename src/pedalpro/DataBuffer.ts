import Convert from "./Convert";

export default class DataBuffer {
    public data: number[];

    public constructor(byteCount: number) {
        this.data = new Array(byteCount);
        this.clear();
    }

    public clear() {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = 0;
        }
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

    public formatData(offset: number = 0, end: number = 0, radix: number = 16): string {
        if (end === 0) { end = this.data.length; }
        if (end > this.data.length) { end = this.data.length; }
        const hex = new Array<string>(end - offset);

        for (let i = offset; i < end; i++) {
            hex[i - offset] = this.data[i].toString(radix).toUpperCase();
        }

        return hex.join(",");
    }

    public getField(offset: number): number {
        return this.data[offset];
    }

    public setField(offset: number, value: number): void {
        this.data[offset] = value;
    }

    public getBitsOfField(offset: number, bit: number, bitLength: number): number {
        return Convert.getBitsOf(this.data[offset], bit, bitLength);
    }

    public setBitsOfField(offset: number, value: number, bit: number, bitLength: number): void {
        this.data[offset] = Convert.setBitsOf(this.data[offset], value, bit, bitLength);
    }

    public getBitOfField(offset: number, bit: number): boolean {
        return Convert.getBitsOf(this.data[offset], bit, 1) === 1;
    }

    public setBitOfField(offset: number, value: boolean, bit: number): void {
        this.data[offset] = Convert.setBitsOf(this.data[offset], value ? 1 : 0, bit, 1);
    }
}