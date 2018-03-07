export const SingleCoilChar = 0x02;
export const HumbuckerChar = 0x03;
export const ExpressionChar = 0x04;
export const StereoChar = 0x05;
export const nameMaxLength = 10;

export enum PresetBufferParts {
    Part1,
    Part2,
    Part3,
    LastPart = Part3
}

// bit flags for each option
export enum BypassSlaveCmp1Flags {
    // BypassAll = 0,
    BypassPan = 1,
    BypassPanSel = 2,
    BypassBoost = 3,
    BypassVolume = 4,
    BypassCompressor = 5,
    BypassPreAmp = 6,   // distortion in non-PPE
    BypassPhaser = 7,
}

// bit flags for each option
export enum BypassSlaveCmp2Flags {
    BypassNoiseGate = 0,
    SoloOn = 1,
    BluesOn = 2,
    NoiseGateSustainOn = 3,
    VcaTremoloOn = 4,
}
