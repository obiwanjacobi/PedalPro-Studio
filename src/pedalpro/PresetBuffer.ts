import { ProtocolBuffer } from "./ProtocolBuffer";
import { nameMaxLength, ExpressionChar, StereoChar, SingleCoilChar, HumbuckerChar } from "./Common";

export default class PresetBuffer extends ProtocolBuffer {
    public constructor(bufferSize: number) {
        super(bufferSize);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        name = name.filter((char: number) => 
            char !== ExpressionChar && char !== StereoChar && char !== SingleCoilChar && char !== HumbuckerChar);

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

    // public getBypassSlaveCmp1Flag(flag: BypassSlaveCmp1Flags): boolean {
    //     return Convert.hasFlag(this.data[PresetBufferFields.BypassSlaveCmp1], flag);
    // }

    // public getBypassSlaveCmp2Flag(flag: BypassSlaveCmp2Flags): boolean {
    //     return Convert.hasFlag(this.data[PresetBufferFields.BypassSlaveCmp2], flag);
    // }

    public getField(offset: number): number {
        return this.data[offset];
    }

    private findCharInName(c: number): boolean {
        let name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === c) !== -1;
    }
}