import { ProtocolBuffer, PartSize, LastPartSize } from "./ProtocolBuffer";

const PresetBufferSize = PartSize + PartSize + LastPartSize;

export default class PedalProPresetBuffer extends ProtocolBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public get name(): string {
        const name: number[] = new Array(10);
        super.read(0, name, 0, 10);
        return String.fromCharCode(...name);
    }
}