import * as fs from "fs";

class VrFileReader {
    index: number;
    buffer: Buffer;

    constructor(buffer: Buffer) {
        this.index = 0;
        this.buffer = buffer;
    }

    get hasMore(): boolean {
        // 15 => index(3-5) + name(10) + buffer(-160)
        return this.buffer.byteLength - this.index > 15;
    }

    getPresetIndex(): number {
        this.skipUntil("0");
        const index = this.readStringWhile(" ");
        this.skipUntil(" ");
        return Number(index);
    }

    getName(): number[] {
        const name = this.read(10);
        this.skip(3);
        return name;
    }

    getPreset(bufferSize: number): number[] {
        bufferSize -= 10;   // minus length name
        this.getPresetIndex();
        const name = this.getName();
        const result = new Array<number>(bufferSize);
        for (let i = 0; i < bufferSize; i++) {
            result[i] = this.readByte();
        }
        return name.concat(result);
    }

    private readByte(): number {
        let byte = this.currentChar;
        this.next();
        let char = this.currentChar;

        if (char !== " ") {
            byte += char;
            this.next();
        }

        this.next();    // skip ' '
        return Number.parseInt(byte, 16);
    }

    private skip(count: number) {
        for (let i = 0; i < count; i++) {
            this.next();
        }
    }
    private skipUntil(ascii: string) {
        const char = this.oneCharOnly(ascii);

        while (this.current < char) {
            this.next();
        }
    }
    private read(count: number): number[] {
        const result = Array<number>(count);
        for (let i = 0; i < count; i++) {
            result[i] = this.current;
            this.next();
        }
        return result;
    }
    private readStringWhile(ascii: string): string {
        const char = this.oneCharOnly(ascii);

        let result = "";
        while (this.current >= char) {
            result += this.currentChar;
            this.next();
        }
        return  result;
    }
    private get current(): number {
        return  this.buffer[this.index];
    }
    private get currentChar(): string {
        return String.fromCharCode(this.buffer[this.index]);
    }
    private next() {
        this.index++;
    }
    private oneCharOnly(char: string): number {
        if (char.length > 1) { throw new RangeError("Use one char only!"); }
        return char.charCodeAt(0);
    }
}

export default class VrFile {
    public readonly presets: number[][];

    public static read(path: string, expectedSize: number): VrFile {
        var file = new VrFile();
        var buffer = fs.readFileSync(path);
        var reader = new VrFileReader(buffer);
        
        while (reader.hasMore) {
            const p = reader.getPreset(expectedSize);
            file.presets.push(p);
        }

        return file;
    }

    private constructor() {
        this.presets = Array<number[]>();
    }
}