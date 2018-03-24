export interface CommonPresetBufferFieldIndex {

    readonly PresetName: number;
    readonly BypassSlaveCmp1: number;
    readonly BypassSlaveCmp2: number;

    readonly PhaseRelationCompressor: number;
    readonly PreampGain: number;

    readonly CompressorModel: number;
    readonly CompressorSensitivity: number;
    readonly CompressorEnvelopeInfo: number;

    // readonly DistortionTone: number;
    // readonly DistortionOut: number;

    readonly NoiseGateSensitivity: number;
    readonly NoiseGateRelease: number;
    readonly VolumeLeft: number;
    readonly VolumeRight: number;

    readonly FuncPhaser: number;
    readonly PhaserPeriodLo: number;
    readonly PhaserPeriodHi: number;
    readonly PhaserDepth: number;

    readonly FuncTremolo: number;
    // #define SET_COMPRESSOR FUNC_TREM,0x07,
    readonly TremoloPeriodLo: number;
    readonly TremoloPeriodHi: number;
    readonly TremoloDepth: number;
    readonly CompressorOut: number;
    readonly PhaserManual: number;

    readonly BypassSlaveRouting: number;
    readonly BypassSlaveFilter: number;
    // bits 0-3 used for amp switching
    // #define LOW_PASS_R BYPASS_SLAVE_FLTR,0x04
    // #define BYPASS_EXT_PED BYPASS_SLAVE_FLTR,0x05
    // ;#define  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // #define CMD_Env_select BYPASS_SLAVE_FLTR,0x07

    readonly PhasesRelationFilter: number;

    readonly EnvelopeFunction: number;
    readonly FrequencyStart1Lo: number;
    readonly FrequencyStartHH: number;
    readonly FrequencyStart2Lo: number;

    readonly EnvelopeSensitivity1: number;
    readonly EnvelopeSensitivity2: number;

    readonly DAQFixFrequency1Lo: number;
    readonly DAQFrequencyHH: number;
    readonly DAQFixFrequency2Lo: number;

    readonly DAQResonanceQ1: number;
    readonly DAQResonanceQ2: number;

    readonly FunctionFormant1: number;
    // #define SET_ENV_FORMANT1 FUNC_FORMANT1,0x07
    // #define SET_FIX_FREQ1 FUNC_FORMANT1,0x06

    readonly FormantPeriod1Lo: number;
    readonly FormantPeriod1Hi: number;
    readonly Frequency1MaxLo: number;
    readonly Frequency1HH: number;
    readonly Frequency1MinLo: number;

    readonly FunctionFormant2: number;
    // #define SET_ENV_FORMANT2 FUNC_FORMANT2,0x07
    // #define SET_FIX_FREQ2 FUNC_FORMANT2,0x06

    readonly FormantPeriod2Lo: number;
    readonly FormantPeriod2Hi: number;
    readonly Frequency2MaxLo: number;
    readonly Frequency2HH: number;
    readonly Frequency2MinLo: number;
    // ,Lead_sc1_FSWs = 0x43,
    // ,Lead_sc2_FSWs = 0x44,

    readonly ModulationConfig: number;
    readonly DelayAuxConfig: number;
    readonly PhasesRelationModulation: number;

    readonly FunctionChorus: number;
    readonly ChorusPeriodLo: number;
    readonly ChorusPeriodHi: number;
    readonly DetuneChorus: number;
    readonly WetChorus: number;
    readonly InChorus: number;

    readonly FuctionFlanger: number;
    readonly FlangerPeriodLo: number;
    readonly FlangerPeriodHi: number;
    readonly DetuneFlanger: number;
    readonly WetFlanger: number;
    readonly FeedbackFlanger: number;
    readonly DlyFlanger: number;

    readonly FunctionTremoloChorus: number;
    readonly TremoloChorusPeriodLo: number;
    readonly TremoloChorusPeriodHi: number;
    readonly DepthTremoloChorus: number;

    readonly DelayTime: number;
    readonly FeedbackDelay: number;
    readonly InDelay: number;
    readonly OutDelay: number;
    readonly WetDelay: number;

    readonly SpeedDelay: number;
    readonly DepthDelay: number;

    readonly AuxGainL: number;
    readonly AuxGainR: number;
    readonly AuxWetL: number;
    readonly AuxWetR: number;
    readonly AuxDryL: number;
    readonly AuxDryR: number;

    readonly MIDICCRoutingChorusFilter: number;
    readonly MIDICCRoutingAUXDELAY: number;

    readonly TapTempoMode: number;
    readonly TapTempoDivision: number;
    readonly TapTempoDivisionDelay: number;

    readonly VirtualBoard: number;
    readonly ExpressionLink: number;

    readonly MidiPCHG1: number;
}