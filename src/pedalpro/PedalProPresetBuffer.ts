import { ProtocolBuffer, PartSize, LastPartSize } from "./ProtocolBuffer";
import * as PresetDef from "./PresetBufferDefs71";

const PresetBufferSize = PartSize + PartSize + LastPartSize;
const SingleCoilChar = 0x02;
const HumbuckerChar = 0x03;
const ExpressionChar = 0x04;
const StereoChar = 0x05;
const nameMaxLength = 10;

export default class PedalProPresetBuffer extends ProtocolBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetDef.PresetName, name, 0, nameMaxLength);

        name = name.filter((char: number) => 
            char !== ExpressionChar && char !== StereoChar);

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
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetDef.PresetName, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === c) !== -1;
    }

    public get bypassSlaveCmp1(): PresetDef.BypassSlaveCmp1Flags {
        return this.data[PresetDef.BypassSlaveCmp1];
    }

    public get bypassSlaveCmp2(): PresetDef.BypassSlaveCmp2Flags {
        return this.data[PresetDef.BypassSlaveCmp2];
    }
}