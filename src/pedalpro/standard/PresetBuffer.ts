import { ProtocolBuffer } from "../ProtocolBuffer";
import * as PresetDef from "./PresetBufferDefs";
import { PresetBufferSize } from "./Constants";

const SingleCoilChar = 0x02;
const HumbuckerChar = 0x03;
const ExpressionChar = 0x04;
const StereoChar = 0x05;
const nameMaxLength = 10;

export default class PresetBuffer extends ProtocolBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetDef.PresetName, name, 0, nameMaxLength);

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

    private findCharInName(c: number): boolean {
        let name: number[] = new Array(nameMaxLength);
        super.read(PresetDef.PresetName, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === c) !== -1;
    }

    public get bypassAll(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassAll);
    }

    public get bypassCompressor(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassComp);
    }

    public get bypassDistortion(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassDist);
    }

    public get bypassPan(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassPan);
    }

    public get bypassPanSel(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassPanSel);
    }

    public get bypassPhaser(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassPhaser);
    }

    public get bypassPre(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassPre);
    }

    public get bypassVolume(): boolean {
        return this.bypassSlaveCmp1Test(PresetDef.BypassSlaveCmp1Flags.BypassVolume);
    }

    private bypassSlaveCmp1Test(flag: PresetDef.BypassSlaveCmp1Flags): boolean {
        // tslint:disable:no-bitwise
        return (this.data[PresetDef.BypassSlaveCmp1] & flag) > 0;
    }

    public get bluesOn(): boolean {
        return this.bypassSlaveCmp2Test(PresetDef.BypassSlaveCmp2Flags.BluesOn);
    }

    public get bypassNoiseGate(): boolean {
        return this.bypassSlaveCmp2Test(PresetDef.BypassSlaveCmp2Flags.BypassNoiseGate);
    }

    public get noiseGateSustainOn(): boolean {
        return this.bypassSlaveCmp2Test(PresetDef.BypassSlaveCmp2Flags.NoiseGateSustainOn);
    }

    public get soloOn(): boolean {
        return this.bypassSlaveCmp2Test(PresetDef.BypassSlaveCmp2Flags.SoloOn);
    }

    public get vcaTremoloOn(): boolean {
        return this.bypassSlaveCmp2Test(PresetDef.BypassSlaveCmp2Flags.VcaTremoloOn);
    }

    private bypassSlaveCmp2Test(flag: PresetDef.BypassSlaveCmp2Flags): boolean {
        // tslint:disable:no-bitwise
        return (this.data[PresetDef.BypassSlaveCmp2] & flag) > 0;
    }
}