export const PartSize = 0x39;
export const LastPartSize = 0x0D;

export enum BufferParts {
    Part1,
    Part2,
    Part3,
    LastPart = Part3
}

export const PresetBufferSize = PartSize + PartSize + LastPartSize;

export const PresetCount: number = 400;