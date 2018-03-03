import PedalProPresetBuffer from "./commands/PedalProPresetBuffer";

const emptyData = [
    0x7b, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x5f, 0x70, 
    0x73, 0x7d, 0xfe, 0x1f, 0x00, 0x00, 0x02, 0x3a, 
    0x00, 0x57, 0x74, 0x00, 0x80, 0x80, 0x04, 0x0e, 
    0x01, 0xff, 0x00, 0x01, 0x16, 0x08, 0x99, 0x00, 
    0x00, 0x6f, 0x00, 0x00, 0x01, 0x00, 0x65, 0x80, 
    0x80, 0x94, 0x05, 0x56, 0x22, 0x1e, 0x00, 0x92, 
    0x04, 0x94, 0x02, 0x00, 0x00, 0x92, 0x04, 0xf6, 
    0x01, 0x59, 0x00, 0x00, 0x1f, 0xff, 0xff, 0x28, 
    0xff, 0x77, 0x7f, 0x7f, 0x7f, 0x28, 0x7f, 0x3c, 
    0x14, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 
    0x20, 0x00, 0xfc, 0x10, 0x00, 0x01, 0xa4, 0x01, 
    0xff, 0xff, 0xff, 0x01, 0x64, 0x00, 0xb3, 0xff, 
    0x82, 0x00, 0x00, 0xde, 0x08, 0xa6, 0xff, 0x00, 
    0xb5, 0x8d, 0x71, 0x00, 0x34, 0xd8, 0xd8, 0x20, 
    0x20, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

export class EmptyPresetBufferImpl  extends PedalProPresetBuffer {
    constructor() {
        super();
        this.data = emptyData;
    }

    public isEmpty(buffer: PedalProPresetBuffer): boolean {
        for (let i = 0; i < this.data.length; i++) {
            if (buffer.data[i] !== this.data[i]) { 
                return false;
            }
        }

        return true;
    }
}

export const EmptyPresetBuffer = new EmptyPresetBufferImpl();