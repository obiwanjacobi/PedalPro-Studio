import { DataBuffer } from "./DataBuffer";
import { nameMaxLength, ExpressionChar, StereoChar, SingleCoilChar, HumbuckerChar } from "./Common";

export class PresetBuffer extends DataBuffer {
    
    public constructor(bufferSize: number) {
        super(bufferSize);
    }

    public setName(
        presetName: string, 
        singleCoil: boolean, 
        humbucker: boolean, 
        expression: boolean, 
        stereo: boolean): void {
        const name: number[] = new Array<number>(nameMaxLength);

        for (let i = 0; i < nameMaxLength; i++) {
            if (i < presetName.length) {
                name[i] = presetName.charCodeAt(i);
            } else {
                name[i] = 0x20;   // space
            }
        }

        const specials = new Array<number>();
        if (singleCoil) { specials.push(SingleCoilChar); }
        if (humbucker) { specials.push(HumbuckerChar); }
        if (stereo) { specials.push(StereoChar); }
        if (expression) { specials.push(ExpressionChar); }

        for (let i = specials.length - 1; i >= 0; i--) {
            const target = name.length - 1 - i;
            name[target] = specials[i];
        }

        super.write(0, name, 0, nameMaxLength);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        // filter out non-ascii
        name = name.filter((char: number) => char >= 0x20);
        return String.fromCharCode(...name);
    }

    public get singleCoil(): boolean {
        return this.findCharInName(SingleCoilChar);
    }

    public get humbucker(): boolean {
        return this.findCharInName(HumbuckerChar);
    }

    public get expression(): boolean {
        return this.findCharInName(ExpressionChar);
    }

    public get stereo(): boolean {
        return this.findCharInName(StereoChar);
    }

    private findCharInName(c: number): boolean {
        const name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === c) !== -1;
    }
}