import CommonPresetBufferFieldIndex from "../CommonPresetBufferFieldIndex";

//
// buffer indexes and values to preset fields for version 8.1
//

export interface PresetBufferExFieldIndex extends CommonPresetBufferFieldIndex {
    readonly HumanSync: number;
    readonly PreAmpConfig: number;
    readonly DdreamSwitches: number;
    // #define Emp_A0_Q Ddream_switches,0x00
    // #define Emp_A1_Q Ddream_switches,0x01
    // #define Jfet_add_gain Ddream_switches,0x02
    // #define Fuzz_add_gain Ddream_switches,0x03
    // #define Emp_add_gain Ddream_switches,0x04
    // #define Dd_retro_diodes Ddream_switches,0x05
    // #define Dd_hard_pos Ddream_switches,0x06
    // #define Dd_hard_neg Ddream_switches,0x07
    readonly EmphasyHighPass: number;
    readonly EmphasyLowPass: number;
    readonly EmphasydB: number;
    readonly EmphasyFrequency: number;
    readonly EmphasyVolume: number;
    readonly DistortionDiodeLowPass: number;
    readonly DistortionDiodeMidPass: number;
    readonly DistortionDiodeHighPass: number;
    readonly DistortionDiodeVolume: number;
    readonly DistortionFetContour: number;
    readonly DistortionFetVolume: number;
    readonly DistortionFuzzVolume: number;
    readonly Equalizer60: number;
    readonly Equalizer125: number;
    readonly Equalizer250: number;
    readonly Equalizer500: number;
    readonly Equalizer1K: number;
    readonly Equalizer2K: number;
    readonly Equalizer4K: number;
    readonly Equalizer8K: number;

    readonly DspAlgorithm: number;
    readonly DspDataStart: number;
    readonly DspDataEnd: number;
}

export const PresetBufferExFields: PresetBufferExFieldIndex = {
    PresetName: 0x00,
    BypassSlaveCmp1: 0x0A,
    BypassSlaveCmp2: 0x0B,

    PhaseRelationCompressor: 0x0C,
    PreampGain: 0x0D,

    CompressorModel: 0x0E,
    CompressorSensitivity: 0x0F,
    CompressorEnvelopeInfo: 0x10,
    CompressorOut: 0x11,

    NoiseGateSensitivity: 0x12,
    NoiseGateRelease: 0x13,

    VolumeLeft: 0x14,
    VolumeRight: 0x15,

    FuncPhaser: 0x16,
    PhaserPeriodLo: 0x17,
    PhaserPeriodHi: 0x18,
    PhaserDepth: 0x19,
    PhaserManual: 0x1A,

    FuncTremolo: 0x1B,
    // #define SET_COMPRESSOR FUNC_TREM,0x07,
    TremoloPeriodLo: 0x1C,
    TremoloPeriodHi: 0x1D,
    TremoloDepth: 0x1E,

    // free byte 0x1F

    // -------------Filters definition------------

    BypassSlaveRouting: 0x20,
    BypassSlaveFilter: 0x21,
    // bits 0-3 used for amp switching
    // #define LOW_PASS_R BYPASS_SLAVE_FLTR,0x04
    // #define BYPASS_EXT_PED BYPASS_SLAVE_FLTR,0x05
    // ,#define  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // #define CMD_Env_select BYPASS_SLAVE_FLTR,0x07

    PhasesRelationFilter: 0x22,

    EnvelopeFunction: 0x23,
    FrequencyStart1Lo: 0x24,
    FrequencyStartHH: 0x25,
    FrequencyStart2Lo: 0x26,

    EnvelopeSensitivity1: 0x27,
    EnvelopeSensitivity2: 0x28,

    DAQFixFrequency1Lo: 0x29,
    DAQFrequencyHH: 0x2A,
    DAQFixFrequency2Lo: 0x2B,

    DAQResonanceQ1: 0x2C,
    DAQResonanceQ2: 0x2D,

    FunctionFormant1: 0x2E,
    // #define SET_ENV_FORMANT1 FUNC_FORMANT1,0x07
    // #define SET_FIX_FREQ1 FUNC_FORMANT1,0x06

    FormantPeriod1Lo: 0x2F,
    FormantPeriod1Hi: 0x30,
    Frequency1MaxLo: 0x31,
    Frequency1HH: 0x32,
    Frequency1MinLo: 0x33,

    FunctionFormant2: 0x34,
    // #define SET_ENV_FORMANT2 FUNC_FORMANT2,0x07
    // #define SET_FIX_FREQ2 FUNC_FORMANT2,0x06

    FormantPeriod2Lo: 0x35,
    FormantPeriod2Hi: 0x36,
    Frequency2MaxLo: 0x37,
    Frequency2HH: 0x38,
    Frequency2MinLo: 0x39,

    HumanSync: 0x3A,
    PreAmpConfig: 0x3B,

    DdreamSwitches: 0x3C,
    // #define Emp_A0_Q Ddream_switches,0x00
    // #define Emp_A1_Q Ddream_switches,0x01
    // #define Jfet_add_gain Ddream_switches,0x02
    // #define Fuzz_add_gain Ddream_switches,0x03
    // #define Emp_add_gain Ddream_switches,0x04
    // #define Dd_retro_diodes Ddream_switches,0x05
    // #define Dd_hard_pos Ddream_switches,0x06
    // #define Dd_hard_neg Ddream_switches,0x07
    EmphasyHighPass: 0x3D,
    EmphasyLowPass: 0x3E,
    EmphasydB: 0x3F,
    EmphasyFrequency: 0x40,
    EmphasyVolume: 0x41,
    DistortionDiodeLowPass: 0x42,
    DistortionDiodeMidPass: 0x43,
    DistortionDiodeHighPass: 0x44,
    DistortionDiodeVolume: 0x45,
    DistortionFetContour: 0x46,
    DistortionFetVolume: 0x47,
    DistortionFuzzVolume: 0x48,
    Equalizer60: 0x49,
    Equalizer125: 0x4A,
    Equalizer250: 0x4B,
    Equalizer500: 0x4C,
    Equalizer1K: 0x4D,
    Equalizer2K: 0x4E,
    Equalizer4K: 0x4F,
    Equalizer8K: 0x50,

    // free byte: 0x151

    ModulationConfig: 0x52,
    DelayAuxConfig: 0x53,
    PhasesRelationModulation: 0x54,

    FunctionChorus: 0x55,
    ChorusPeriodLo: 0x56,
    ChorusPeriodHi: 0x57,
    DetuneChorus: 0x58,
    WetChorus: 0x59,
    InChorus: 0x5A,

    FuctionFlanger: 0x5B,
    FlangerPeriodLo: 0x5C,
    FlangerPeriodHi: 0x5D,
    DetuneFlanger: 0x5E,
    WetFlanger: 0x5F,
    FeedbackFlanger: 0x60,
    DlyFlanger: 0x61,

    FunctionTremoloChorus: 0x62,
    TremoloChorusPeriodLo: 0x63,
    TremoloChorusPeriodHi: 0x64,
    DepthTremoloChorus: 0x65,

    DelayTime: 0x66,
    FeedbackDelay: 0x67,
    InDelay: 0x68,
    OutDelay: 0x69,
    WetDelay: 0x6A,
    SpeedDelay: 0x6B,
    DepthDelay: 0x6C,

    AuxGainL: 0x6D,
    AuxGainR: 0x6E,
    AuxWetL: 0x6F,
    AuxWetR: 0x70,
    AuxDryL: 0x71,
    AuxDryR: 0x72,

    DspAlgorithm: 0x73,
    // not used - DspSignatureAlg: 0x74,
    // not used: 0x75,
    // not used: 0x76,
    
    MIDICCRoutingChorusFilter: 0x77, // bits 0-4 are for the filter routing
    MIDICCRoutingAUXDELAY: 0x78,

    TapTempoMode: 0x79,
    TapTempoDivision: 0x7A,
    TapTempoDivisionDelay: 0x7B,

    VirtualBoard: 0x7C,
    ExpressionLink: 0x7D,
    
    MidiPCHG1: 0x7E,
    // not used: 0x7F,

    // location 0x80-0x9F used for DSP parameters
    DspDataStart: 0x80,
    DspDataEnd: 0x9F,
};

// bit flags for each option
export enum BypassSlaveCmp1Flags {
    BypassAll = 0,  // not used
    BypassPan = 1,
    BypassPanSel = 2,
    BypassBoost = 3,
    BypassVolume = 4,
    BypassComp = 5,
    BypassPreAmp = 6,
    BypassPhaser = 7
}

// bit flags for each option
export enum BypassSlaveCmp2Flags {
    BypassNoiseGate = 0,
    SoloOn = 1,
    BluesOn = 2,
    NoiseGateSustainOn = 3,
    VcaTremoloOn = 4,
}