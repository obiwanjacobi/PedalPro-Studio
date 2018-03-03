import { ProtocolBuffer } from "../ProtocolBuffer";
import { BufferParts, PartSize, LastPartSize } from "./Constants";

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
       this.buffer.data[3] = presetIndex / 256;
       this.buffer.data[4] = presetIndex % 256;
   }

   /** Prepares the buffer for the load-preset command
    *  that sends the preset data in the MCU memory over 
    *  the USB wire.
    */
   public setReadPresetCmd(bufferIndex: BufferParts) {
       this.buffer.clear();
       this.buffer.data[1] = 0x17;    // load-preset command
       this.buffer.data[5] = bufferIndex === BufferParts.LastPart ? LastPartSize : PartSize;
       this.buffer.data[6] = bufferIndex * PartSize;
   }

}