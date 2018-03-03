import { ProtocolBuffer } from "../ProtocolBuffer";
import { PresetBufferFields, BypassSlaveCmp1Flags, BypassSlaveCmp2Flags } from "./PresetBufferFields";
import { PresetBufferSize } from "./Constants";
import { nameMaxLength, ExpressionChar, StereoChar, SingleCoilChar, HumbuckerChar } from "../Common";

export default class PresetBuffer extends ProtocolBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetBufferFields.PresetName, name, 0, nameMaxLength);

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

    public get bypassAll(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassAll);
    }

    public get bypassCompressor(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassComp);
    }

    public get bypassDistortion(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassDist);
    }

    public get bypassPan(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassPan);
    }

    public get bypassPanSel(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassPanSel);
    }

    public get bypassPhaser(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassPhaser);
    }

    public get bypassBoost(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassPre);
    }

    public get bypassVolume(): boolean {
        return this.bypassSlaveCmp1Test(BypassSlaveCmp1Flags.BypassVolume);
    }

    public get bluesOn(): boolean {
        return this.bypassSlaveCmp2Test(BypassSlaveCmp2Flags.BluesOn);
    }

    public get bypassNoiseGate(): boolean {
        return this.bypassSlaveCmp2Test(BypassSlaveCmp2Flags.BypassNoiseGate);
    }

    public get noiseGateSustainOn(): boolean {
        return this.bypassSlaveCmp2Test(BypassSlaveCmp2Flags.NoiseGateSustainOn);
    }

    public get soloOn(): boolean {
        return this.bypassSlaveCmp2Test(BypassSlaveCmp2Flags.SoloOn);
    }

    public get vcaTremoloOn(): boolean {
        return this.bypassSlaveCmp2Test(BypassSlaveCmp2Flags.VcaTremoloOn);
    }

    public getField(offset: PresetBufferFields): number {
        return this.data[offset];
    }

    private findCharInName(c: number): boolean {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetBufferFields.PresetName, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === c) !== -1;
    }

    private bypassSlaveCmp1Test(flag: BypassSlaveCmp1Flags): boolean {
        // tslint:disable:no-bitwise
        return (this.data[PresetBufferFields.BypassSlaveCmp1] & flag) > 0;
    }

    private bypassSlaveCmp2Test(flag: BypassSlaveCmp2Flags): boolean {
        // tslint:disable:no-bitwise
        return (this.data[PresetBufferFields.BypassSlaveCmp2] & flag) > 0;
    }
}