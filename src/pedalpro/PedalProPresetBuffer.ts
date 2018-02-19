import { ProtocolBuffer, PartSize, LastPartSize } from "./ProtocolBuffer";

const PresetBufferSize = PartSize + PartSize + LastPartSize;
const ExpressionChar = 0x04;
const StereoChar = 0x05;
const nameMaxLength = 10;

export default class PedalProPresetBuffer extends ProtocolBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public get name(): string {
        let name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        name = name.filter((char: number) => 
            char !== ExpressionChar && char !== StereoChar);

        return String.fromCharCode(...name);
    }

    public get expression(): boolean {
        let name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === ExpressionChar) !== -1;
    }

    public get stereo(): boolean {
        let name: number[] = new Array(nameMaxLength);
        super.read(0, name, 0, nameMaxLength);

        return name.findIndex((char: number) => char === StereoChar) !== -1;
    }
}