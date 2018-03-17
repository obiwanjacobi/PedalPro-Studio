import { ProtocolBuffer } from "./ProtocolBuffer";
import { PresetBufferParts } from "./Common";

export default class CommandBufferBuilder {
    private buffer: ProtocolBuffer;

    public constructor(buffer: ProtocolBuffer) {
        this.buffer = buffer;
    }

    /** Prepares the buffer for the read-preset command 
     *  that brings in the preset data from the external memory 
     *  into the MCU memory. The preset is NOT selected as current.
     */
    public setLoadPresetCmd(presetIndex: number) {
        this.buffer.clear();
        this.buffer.data[1] = 0x16;    // read-preset command
        this.buffer.data[3] = Math.floor(presetIndex / 256);
        this.buffer.data[4] = presetIndex % 256;
    }

    /** Prepares the buffer for the load-preset command
     *  that sends the preset data in the MCU memory over 
     *  the USB wire.
     */
    public setReadPresetCmd(bufferIndex: PresetBufferParts, partSize: number, lastPartSize: number) {
        this.buffer.clear();
        this.buffer.data[1] = 0x17;    // load-preset command
        this.buffer.data[5] = bufferIndex === PresetBufferParts.LastPart ? lastPartSize : partSize;
        this.buffer.data[6] = bufferIndex * partSize;
    }

    /**
     * Prepares the buffer for the write preset command
     * that transfers the preset data in segments/parts.
     * Returns the offset into the buffer where the payload data starts.
     */
    public setWritePresetCmd(bufferIndex: PresetBufferParts, partSize: number, lastPartSize: number): number {
        this.buffer.clear();
        this.buffer.data[1] = 0x15;     // save-preset command
        this.buffer.data[5] = bufferIndex === PresetBufferParts.LastPart ? lastPartSize : partSize;
        this.buffer.data[6] = bufferIndex * partSize;
        return 7;
    }

    /**
     * Prepares the buffer for the save preset command
     * that writes the entire preset into external (to the MCU) storage.
     */
    public setSavePresetCmd(presetIndex: number) {
        this.buffer.clear();
        this.buffer.data[1] = 0x14;     // write-preset command
        this.buffer.data[3] = Math.floor(presetIndex / 256);
        this.buffer.data[4] = presetIndex % 256;
    }
}