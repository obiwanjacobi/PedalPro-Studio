//
// buffer indexes and values to preset fields for version 7.1
//

export const PresetName = 0x00;
export const BypassSlaveCmp1 = 0x0A;
// bit flags for each option
export enum BypassSlaveCmp1Flags {
    BypassAll = 0,
    BypassPan = 1,
    BypassPanSel = 2,
    BypassPre = 3,
    BypassVolume = 4,
    BypassComp = 5,
    BypassDist = 6,
    BypassPhaser = 7
}

export const BypassSlaveCmp2 = 0x0B;
export enum BypassSlaveCmp2Flags {
    // bit flags for each option
    BypassNoiseGate = 0,
    SoloOn = 1,
    BluesOn = 2,
    NoiseGateSustainOn = 3,
    VcaTremoloOn = 4,
}

export const PhaseRelationCompressor = 0x0C;
export const PreampGain = 0x0D;

export const CompressorModel = 0x0E;
export const CompressorSensitivity = 0x0F;
export const CompressorEnvelopeInfo = 0x10;

export const DistortionTone = 0x11;
export const DistortionOut = 0x12;

export const NoiseGateSensitivity = 0x13;
export const NoiseGateRelease = 0x14;
export const VolumeLeft = 0x15;
export const VolumeRight = 0x16;

export const FuncPhaser = 0x17;
export const PhaserPeriodLo = 0x18;
export const PhaserPeriodHi = 0x19;
export const PhaserDepth = 0x1A;

export const FuncTremolo = 0x1B;
// #define SET_COMPRESSOR FUNC_TREM,0x07;
export const TremoloPeriodLo = 0x1C;
export const TremoloPeriodHi = 0x1D;
export const TremoloDepth = 0x1E;
export const CompressorOut = 0x1F;
export const PhaserManual = 0x20;

// ----------------------
// 0x1F - 0x28 Data memory segment reserved to Plugin
// ----------------------

// -------------Filters definition------------

export const BypassSlaveRouting = 0x29;
export const BypassSlaveFilter = 0x2A;
// bits 0-3 used for amp switching
// #define LOW_PASS_R BYPASS_SLAVE_FLTR,0x04
// #define BYPASS_EXT_PED BYPASS_SLAVE_FLTR,0x05
// ;#define  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// #define CMD_Env_select BYPASS_SLAVE_FLTR,0x07

export const PhasesRelationFilter = 0x2B;

export const EnvelopeFunction = 0x2C;
export const FrequencyStart1Lo = 0x2D;
export const FrequencyStartHH = 0x2E;
export const FrequencyStart2Lo = 0x2F;

export const EnvelopeSensitivity1 = 0x30;
export const EnvelopeSensitivity2 = 0x31;

export const DAQFixFrequency1Lo = 0x32;
export const DAQFrequencyHH = 0x33;
export const DAQFixFrequency2Lo = 0x34;

export const DAQResonanceQ1 = 0x35;
export const DAQResonanceQ2 = 0x36;

export const FunctionFormant1 = 0x37;
// #define SET_ENV_FORMANT1 FUNC_FORMANT1,0x07
// #define SET_FIX_FREQ1 FUNC_FORMANT1,0x06

export const FormantPeriod1Lo = 0x38;
export const FormantPeriod1Hi = 0x39;
export const Frequency1MaxLo = 0x3A;
export const Frequency1HH = 0x3B;
export const Frequency1MinLo = 0x3C;

export const FunctionFormant2 = 0x3D;
// #define SET_ENV_FORMANT2 FUNC_FORMANT2,0x07
// #define SET_FIX_FREQ2 FUNC_FORMANT2,0x06

export const FormantPeriod2Lo = 0x3E;
export const FormantPeriod2Hi = 0x3F;
export const Frequency2MaxLo = 0x40;
export const Frequency2HH = 0x41;
export const Frequency2MinLo = 0x42;
// ;Lead_sc1_FSWs = 0x43;
// ;Lead_sc2_FSWs = 0x44;

// --------------------------------
// 0x43-0x4D Reserved to plugin filters
// -------------------------------

export const ModulationConfig = 0x4E;
export const DelayAuxConfig = 0x4F;
export const PhasesRelationModulation = 0x50;

export const FunctionChorus = 0x51;
export const ChorusPeriodLo = 0x52;
export const ChorusPeriodHi = 0x53;
export const DetuneChorus = 0x54;
export const WetChorus = 0x55;
export const InChorus = 0x56;

export const FuctionFlanger = 0x57;
export const FlangerPeriodLo = 0x58;
export const FlangerPeriodHi = 0x59;
export const DetuneFlanger = 0x5A;
export const WetFlanger = 0x5B;
export const FeedbackFlanger = 0x5C;
export const DlyFlanger = 0x5D;

export const FunctionTremoloChorus = 0x5E;
export const TremoloChorusPeriodLo = 0x5F;
export const TremoloChorusPeriodHi = 0x60;
export const DepthTremoloChorus = 0x61;

export const DelayTime = 0x62;
export const FeedbackDelay = 0x63;
export const InDelay = 0x64;
export const OutDelay = 0x65;
export const WetDelay = 0x66;

export const SpeedDelay = 0x67;
export const DepthDelay = 0x68;

export const AuxGainL = 0x69;
export const AuxGainR = 0x6A;
export const AuxWetL     = 0x6B;
export const AuxWetR     = 0x6C;
export const AuxDryL     = 0x6D;
export const AuxDryR     = 0x6E;

// --------------------------------
// 0x6F-0x77Reserved to plugin DSP
// -------------------------------

export const MIDICCRoutingChorusFilter = 0x77; // bits 0-4 are for the filter routing
export const MIDICCRoutingAUXDELAY = 0x78;

export const TapTempoMode = 0x79;
export const TapTempoDivision = 0x7A;
export const TapTempoDivisionDelay = 0x7B;
export const VirtualBoard = 0x7C;
export const ExpressionLink = 0x7D;
export const MidiPCHG1 = 0x7E;
export const MidiPCHG2 = 0x7F;
