import CommonPresetBufferFieldIndex from "../CommonPresetBufferFieldIndex";

//
// buffer indexes and values to preset fields for PP
//

export interface PresetBufferFieldIndex extends CommonPresetBufferFieldIndex {
    readonly DistortionTone: number;
    readonly DistortionOut: number;

    readonly MidiPCHG2: number;
}

export const PresetBufferFields: PresetBufferFieldIndex = {

    PresetName: 0x00,
    BypassSlaveCmp1: 0x0A,
    BypassSlaveCmp2: 0x0B,

    PhaseRelationCompressor: 0x0C,
    PreampGain: 0x0D,

    CompressorModel: 0x0E,
    CompressorSensitivity: 0x0F,
    CompressorEnvelopeInfo: 0x10,

    DistortionTone: 0x11,
    DistortionOut: 0x12,

    NoiseGateSensitivity: 0x13,
    NoiseGateRelease: 0x14,
    VolumeLeft: 0x15,
    VolumeRight: 0x16,

    FuncPhaser: 0x17,
    PhaserPeriodLo: 0x18,
    PhaserPeriodHi: 0x19,
    PhaserDepth: 0x1A,

    FuncTremolo: 0x1B,
    // #define SET_COMPRESSOR FUNC_TREM,0x07,
    TremoloPeriodLo: 0x1C,
    TremoloPeriodHi: 0x1D,
    TremoloDepth: 0x1E,
    CompressorOut: 0x1F,
    PhaserManual: 0x20,

    // ----------------------
    // 0x1F - 0x28 Data memory segment reserved to Plugin
    // ----------------------

    // -------------Filters definition------------

    BypassSlaveRouting: 0x29,
    BypassSlaveFilter: 0x2A,
    // bits 0-3 used for amp switching
    // #define LOW_PASS_R BYPASS_SLAVE_FLTR,0x04
    // #define BYPASS_EXT_PED BYPASS_SLAVE_FLTR,0x05
    // ;#define  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // #define CMD_Env_select BYPASS_SLAVE_FLTR,0x07

    PhasesRelationFilter: 0x2B,

    EnvelopeFunction: 0x2C,
    FrequencyStart1Lo: 0x2D,
    FrequencyStartHH: 0x2E,
    FrequencyStart2Lo: 0x2F,

    EnvelopeSensitivity1: 0x30,
    EnvelopeSensitivity2: 0x31,

    DAQFixFrequency1Lo: 0x32,
    DAQFrequencyHH: 0x33,
    DAQFixFrequency2Lo: 0x34,

    DAQResonanceQ1: 0x35,
    DAQResonanceQ2: 0x36,

    FunctionFormant1: 0x37,
    // #define SET_ENV_FORMANT1 FUNC_FORMANT1,0x07
    // #define SET_FIX_FREQ1 FUNC_FORMANT1,0x06

    FormantPeriod1Lo: 0x38,
    FormantPeriod1Hi: 0x39,
    Frequency1MaxLo: 0x3A,
    Frequency1HH: 0x3B,
    Frequency1MinLo: 0x3C,

    FunctionFormant2: 0x3D,
    // #define SET_ENV_FORMANT2 FUNC_FORMANT2,0x07
    // #define SET_FIX_FREQ2 FUNC_FORMANT2,0x06

    FormantPeriod2Lo: 0x3E,
    FormantPeriod2Hi: 0x3F,
    Frequency2MaxLo: 0x40,
    Frequency2HH: 0x41,
    Frequency2MinLo: 0x42,
    // ,Lead_sc1_FSWs: 0x43,
    // ,Lead_sc2_FSWs: 0x44,

    // --------------------------------
    // 0x43-0x4D Reserved to plugin filters
    // -------------------------------

    ModulationConfig: 0x4E,
    DelayAuxConfig: 0x4F,
    PhasesRelationModulation: 0x50,

    FunctionChorus: 0x51,
    ChorusPeriodLo: 0x52,
    ChorusPeriodHi: 0x53,
    DetuneChorus: 0x54,
    WetChorus: 0x55,
    InChorus: 0x56,

    FuctionFlanger: 0x57,
    FlangerPeriodLo: 0x58,
    FlangerPeriodHi: 0x59,
    DetuneFlanger: 0x5A,
    WetFlanger: 0x5B,
    FeedbackFlanger: 0x5C,
    DlyFlanger: 0x5D,

    FunctionTremoloChorus: 0x5E,
    TremoloChorusPeriodLo: 0x5F,
    TremoloChorusPeriodHi: 0x60,
    DepthTremoloChorus: 0x61,

    DelayTime: 0x62,
    FeedbackDelay: 0x63,
    InDelay: 0x64,
    OutDelay: 0x65,
    WetDelay: 0x66,

    SpeedDelay: 0x67,
    DepthDelay: 0x68,

    AuxGainL: 0x69,
    AuxGainR: 0x6A,
    AuxWetL: 0x6B,
    AuxWetR: 0x6C,
    AuxDryL: 0x6D,
    AuxDryR: 0x6E,

    // --------------------------------
    // 0x6F-0x77 Reserved to plugin DSP
    // -------------------------------

    MIDICCRoutingChorusFilter: 0x77, // bits 0-4 are for the filter routing
    MIDICCRoutingAUXDELAY: 0x78,

    TapTempoMode: 0x79,
    TapTempoDivision: 0x7A,
    TapTempoDivisionDelay: 0x7B,
    VirtualBoard: 0x7C,
    ExpressionLink: 0x7D,
    MidiPCHG1: 0x7E,
    MidiPCHG2: 0x7F,
};
