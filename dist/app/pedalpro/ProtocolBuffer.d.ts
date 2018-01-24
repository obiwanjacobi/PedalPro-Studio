export declare const PartSize = 57;
export declare const LastPartSize = 13;
export declare enum BufferParts {
    Part1 = 0,
    Part2 = 1,
    Part3 = 2,
    LastPart = 2,
}
export declare class ProtocolBuffer {
    data: number[];
    constructor(byteCount?: number);
    clear(): void;
    readonly command: number;
    write(offset: number, source: number[], srcOffset: number, length: number): number;
    read(offset: number, target: number[], trgOffset: number, length: number): number;
    /** Prepares the buffer for the read-preset command
     *  that brings in the preset data from the external memory
     *  into the MCU memory. The preset is NOT selected as current.
     */
    setLoadPresetCmd(presetIndex: number): void;
    /** Prepares the buffer for the load-preset command
     *  that sends the preset data in the MCU memory over
     *  the USB wire.
     */
    setReadPresetCmd(bufferIndex: BufferParts): void;
}
