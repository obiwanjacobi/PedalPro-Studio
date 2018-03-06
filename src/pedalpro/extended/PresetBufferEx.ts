import { PresetBufferExFields } from "./PresetBufferExFields";
import { PresetBufferSize } from "./ConstantsEx";
import PresetBuffer from "../standard/PresetBuffer";

export default class PresetBufferEx extends PresetBuffer {
    public constructor() {
        super(PresetBufferSize);
    }

    public getFieldEx(offset: PresetBufferExFields): number {
        return this.data[offset];
    }
}