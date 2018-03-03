import { ProtocolBuffer } from "../ProtocolBuffer";
import { PresetBufferExFields } from "./PresetBufferExFields";
import { PresetBufferSize } from "./ConstantsEx";
import { nameMaxLength, ExpressionChar, StereoChar, SingleCoilChar, HumbuckerChar } from "../Common";

export default class PresetBufferEx extends ProtocolBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetBufferExFields.PresetName, name, 0, nameMaxLength);

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

    public getField(offset: PresetBufferExFields): number {
        return this.data[offset];
    }

    private findCharInName(c: number): boolean {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetBufferExFields.PresetName, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === c) !== -1;
    }

    // private bypassSlaveCmp1Test(flag: BypassSlaveCmp1Flags): boolean {
    //     // tslint:disable:no-bitwise
    //     return (this.data[PresetBufferExFields.BypassSlaveCmp1] & flag) > 0;
    // }

    // private bypassSlaveCmp2Test(flag: BypassSlaveCmp2Flags): boolean {
    //     // tslint:disable:no-bitwise
    //     return (this.data[PresetBufferExFields.BypassSlaveCmp2] & flag) > 0;
    // }
}