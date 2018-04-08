import { PresetBuffer } from "./PresetBuffer";
import { Preset } from "../model/Preset";
import { Compressor } from "../model/Compressor";
import { Boost } from "../model/Boost";
import { Phaser } from "../model/Phaser";
import { NoiseGate } from "../model/NoiseGate";
import { Volume } from "../model/Volume";
import { Filters, 
    Filter1, Filter2, AutoFilter1, EnvelopeFilter1, EqFilter1, AutoFilter2, EnvelopeFilter2, EqFilter2, Filter2Type 
} from "../model/Filters";
import { PresetTraits } from "../model/PresetTraits";
import { CommonPresetBufferFieldIndex } from "./CommonPresetBufferFieldIndex";
import { Convert } from "./Convert";
import { Modulation, Chorus, Vibe, Flanger, Harmonics } from "../model/Modulation";
import { Delay } from "../model/Delay";
import { Aux, AmpSwitches } from "../model/SendReturn";
import { VoltageControlledAmp } from "../model/VoltageControlledAmp";
import { TapTempo } from "../model/TapTempo";
import { Midi, MidiRouting } from "../model/Midi";

// tslint:disable:max-line-length

export abstract class CommonPresetDeserializer<FieldsT extends CommonPresetBufferFieldIndex> {
    protected readonly fields: FieldsT;

    protected static deserializeTraits(buffer: PresetBuffer): PresetTraits {
        const traits = <PresetTraits> { };

        traits.singleCoil = buffer.singleCoil;
        traits.humbucker = buffer.humbucker;
        traits.expression = buffer.expression;
        traits.stereo = buffer.stereo;

        return traits;
    }

    protected constructor(fields: FieldsT) {
        this.fields = fields;
    }

    protected deserializePreset(buffer: PresetBuffer): Preset {
        const preset: Preset = <Preset> { };
        // preset.data = buffer.formatData();
        preset.name = buffer.name.trim();
        preset.traits = CommonPresetDeserializer.deserializeTraits(buffer);

        return preset;
    }
    
    protected deserializeCompressor(buffer: PresetBuffer): Compressor {
        const compressor = <Compressor> { };
        compressor.attack = buffer.getBitsOfField(this.fields.CompressorEnvelopeInfo, 2, 3);
        compressor.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 5);
        compressor.level = buffer.getField(this.fields.CompressorOut);
        compressor.model = buffer.getField(this.fields.CompressorModel);
        compressor.release = buffer.getBitsOfField(this.fields.CompressorEnvelopeInfo, 5, 3);
        compressor.sensitivity = buffer.getField(this.fields.CompressorSensitivity);

        return  compressor;
    }

    protected deserializeBoost(buffer: PresetBuffer): Boost {
        const boost = <Boost> { };
        boost.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 3);
        boost.gain = buffer.getField(this.fields.PreampGain);

        return  boost;
    }

    protected deserializePhaser(buffer: PresetBuffer): Phaser {
        const phaser = <Phaser> { };
        phaser.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 7);
        phaser.depth = buffer.getField(this.fields.PhaserDepth);
        phaser.manual = buffer.getField(this.fields.PhaserManual);
        phaser.phase = buffer.getBitsOfField(this.fields.PhaseRelationCompressor, 3, 2);
        phaser.tempo = Convert.makeWord(
             buffer.getField(this.fields.PhaserPeriodHi), buffer.getField(this.fields.PhaserPeriodLo));
        phaser.wave = buffer.getBitsOfField(this.fields.FuncPhaser, 3, 2);

        return  phaser;
    }

    protected deserializeNoiseGate(buffer: PresetBuffer): NoiseGate {
        const noiseGate = <NoiseGate> { };
        noiseGate.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp2, 0);
        noiseGate.noiseLevel = buffer.getField(this.fields.NoiseGateSensitivity);
        noiseGate.release = buffer.getField(this.fields.NoiseGateRelease);
        noiseGate.sustain = !buffer.getBitOfField(this.fields.BypassSlaveCmp2, 3);

        return  noiseGate;
    }

    protected deserializeVolume(buffer: PresetBuffer): Volume {
        const volume = <Volume> { };
        volume.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 4);
        volume.levelL = buffer.getField(this.fields.VolumeLeft);
        volume.levelR = buffer.getField(this.fields.VolumeRight);

        return  volume;
    }

    protected deserializeFilters(buffer: PresetBuffer): Filters {
        const filters = <Filters> { };
        filters.autoHumanSync = !buffer.getBitOfField(this.fields.BypassSlaveFilter, 6);
        filters.routing = buffer.getField(this.fields.BypassSlaveRouting);

        // --- Filter 1 ---

        filters.filter1 = <Filter1> { };
        filters.filter1.resonance = buffer.getField(this.fields.DAQResonanceQ1);
        filters.filter1.mode = buffer.getBitsOfField(this.fields.FunctionFormant1, 7, 2);
        
        filters.filter1.auto = <AutoFilter1> { };
        filters.filter1.auto.maxFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.Frequency1HH, 1, 2), 
            buffer.getField(this.fields.Frequency1MaxLo));
        filters.filter1.auto.minFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.Frequency1HH, 3, 2),
            buffer.getField(this.fields.Frequency1MinLo));
        filters.filter1.auto.phase = buffer.getBitsOfField(this.fields.PhasesRelationFilter, 1, 2);
        filters.filter1.auto.tempo = Convert.makeWord(
            buffer.getField(this.fields.FormantPeriod1Hi),
            buffer.getField(this.fields.FormantPeriod1Lo));
        filters.filter1.auto.wave = buffer.getBitsOfField(this.fields.FunctionFormant1, 3, 3);
        
        filters.filter1.envelope = <EnvelopeFilter1> { };
        filters.filter1.envelope.function = buffer.getBitsOfField(this.fields.EnvelopeFunction, 1, 2);
        filters.filter1.envelope.sensitivity = buffer.getField(this.fields.EnvelopeSensitivity1);
        filters.filter1.envelope.startFrequency = Convert.makeWord(
             buffer.getBitsOfField(this.fields.FrequencyStartHH, 1, 2),
             buffer.getField(this.fields.FrequencyStart1Lo));
        
        filters.filter1.eq = <EqFilter1> { };
        filters.filter1.eq.resonance = buffer.getField(this.fields.DAQResonanceQ1);
        filters.filter1.eq.enhancedFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.DAQFrequencyHH, 1, 2),
            buffer.getField(this.fields.DAQFixFrequency1Lo));

        // --- Filter 2 ---

        filters.filter2 = <Filter2> { };
        filters.filter2.resonance = buffer.getField(this.fields.DAQResonanceQ2);
        filters.filter2.type = buffer.getBitOfField(this.fields.BypassSlaveFilter, 4) ? Filter2Type.BandPass : Filter2Type.LowPass;
        filters.filter2.mode = buffer.getBitsOfField(this.fields.FunctionFormant2, 7, 2);
        
        filters.filter2.auto = <AutoFilter2> { };
        filters.filter2.auto.maxFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.Frequency2HH, 1, 2),
            buffer.getField(this.fields.Frequency2MaxLo));
        filters.filter2.auto.minFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.Frequency2HH, 3, 2),
            buffer.getField(this.fields.Frequency2MinLo));
        filters.filter2.auto.phase = buffer.getBitsOfField(this.fields.PhasesRelationFilter, 7, 2);
        filters.filter2.auto.tempo = Convert.makeWord(
            buffer.getField(this.fields.FormantPeriod2Hi), 
            buffer.getField(this.fields.FormantPeriod2Lo));
        filters.filter2.auto.wave = buffer.getBitsOfField(this.fields.FunctionFormant2, 3, 3);
        
        filters.filter2.envelope = <EnvelopeFilter2> { };
        filters.filter2.envelope.function = buffer.getBitsOfField(this.fields.EnvelopeFunction, 5, 2);
        filters.filter2.envelope.sensitivity = buffer.getField(this.fields.EnvelopeSensitivity2);
        filters.filter2.envelope.startFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.FrequencyStartHH, 3, 2),
            buffer.getField(this.fields.FrequencyStart2Lo));
        
        filters.filter2.eq = <EqFilter2> { };
        filters.filter2.eq.resonance = buffer.getField(this.fields.DAQResonanceQ2);
        filters.filter2.eq.enhancedFrequency = Convert.makeWord(
            buffer.getBitsOfField(this.fields.DAQFrequencyHH, 3, 2),
            buffer.getField(this.fields.DAQFixFrequency2Lo));

        return  filters;
    }

    protected deserializeModulation(buffer: PresetBuffer): Modulation {
        const modulation = <Modulation> { };
        modulation.mode = buffer.getBitsOfField(this.fields.ModulationConfig, 1, 2);

        modulation.chorus = <Chorus> { };
        modulation.chorus.bright = !buffer.getBitOfField(this.fields.ModulationConfig, 3);
        modulation.chorus.depth = buffer.getField(this.fields.DetuneChorus);
        modulation.chorus.level = buffer.getField(this.fields.InChorus);
        modulation.chorus.phase = buffer.getBitsOfField(this.fields.PhasesRelationModulation, 1, 2);
        modulation.chorus.tempo = Convert.makeWord(
            buffer.getField(this.fields.ChorusPeriodHi),
            buffer.getField(this.fields.ChorusPeriodLo));
        modulation.chorus.wave = buffer.getBitsOfField(this.fields.FunctionChorus, 3, 3);
        modulation.chorus.wet = buffer.getField(this.fields.WetChorus);

        modulation.vibe = <Vibe> { };
        modulation.vibe.boost = !buffer.getBitOfField(this.fields.ModulationConfig, 4);
        modulation.vibe.depth = buffer.getField(this.fields.DepthTremoloChorus);
        modulation.vibe.phase = buffer.getBitsOfField(this.fields.PhasesRelationModulation, 3, 2);
        modulation.vibe.tempo = Convert.makeWord(
            buffer.getField(this.fields.TremoloChorusPeriodHi),
            buffer.getField(this.fields.TremoloChorusPeriodLo));
        modulation.vibe.wave = buffer.getBitsOfField(this.fields.FunctionTremoloChorus, 3, 3);

        modulation.flanger = <Flanger> { };
        modulation.flanger.delay = buffer.getField(this.fields.DlyFlanger);
        modulation.flanger.depth = buffer.getField(this.fields.DetuneFlanger);
        modulation.flanger.feedback = buffer.getField(this.fields.FeedbackFlanger);
        modulation.flanger.harmonics = buffer.getBitOfField(this.fields.ModulationConfig, 5) ? Harmonics.Odd : Harmonics.Even;
        modulation.flanger.tempo = Convert.makeWord(
            buffer.getField(this.fields.FlangerPeriodHi),
            buffer.getField(this.fields.FlangerPeriodLo));
        modulation.flanger.wave = buffer.getBitsOfField(this.fields.FuctionFlanger, 3, 3);
        modulation.flanger.wet = buffer.getField(this.fields.WetFlanger);

        return  modulation;
    }

    protected deserializeDelay(buffer: PresetBuffer): Delay {
        const delay = <Delay> { };
        delay.feedback = buffer.getField(this.fields.FeedbackDelay);
        delay.inputLevel = buffer.getField(this.fields.InDelay);
        delay.outputLevel = buffer.getField(this.fields.OutDelay);
        delay.range = buffer.getBitsOfField(this.fields.DelayAuxConfig, 3, 2);
        delay.routing = buffer.getBitsOfField(this.fields.DelayAuxConfig, 1, 2);
        delay.time = buffer.getField(this.fields.DelayTime);
        delay.wet = buffer.getField(this.fields.WetDelay);

        delay.modulation = !buffer.getBitOfField(this.fields.DelayAuxConfig, 4);
        delay.modDepth = buffer.getField(this.fields.DepthDelay);
        delay.modSpeed = buffer.getField(this.fields.SpeedDelay);

        return delay;
    }

    protected deserializeAux(buffer: PresetBuffer): Aux {
        const aux = <Aux> { };
        aux.routing = buffer.getBitsOfField(this.fields.DelayAuxConfig, 7, 3);
        aux.mixDryLevelL = buffer.getField(this.fields.AuxDryL);
        aux.mixDryLevelR = buffer.getField(this.fields.AuxDryR);
        aux.mixGainSendL = buffer.getField(this.fields.AuxGainL);
        aux.mixGainSendR = buffer.getField(this.fields.AuxGainR);
        aux.mixWetLevelL = buffer.getField(this.fields.AuxWetL);
        aux.mixWetLevelR = buffer.getField(this.fields.AuxWetR);

        aux.switches = <AmpSwitches> { };
        aux.switches.switch1 = !buffer.getBitOfField(this.fields.BypassSlaveFilter, 0);
        aux.switches.switch2 = !buffer.getBitOfField(this.fields.BypassSlaveFilter, 1);
        aux.switches.switch3 = !buffer.getBitOfField(this.fields.BypassSlaveFilter, 2);
        aux.switches.switch4 = !buffer.getBitOfField(this.fields.BypassSlaveFilter, 3);

        return aux;
    }

    protected deserializeVca(buffer: PresetBuffer): VoltageControlledAmp {
        const vca = <VoltageControlledAmp> { };
        vca.assign = Convert.makeByte(
            buffer.getBitsOfField(this.fields.BypassSlaveCmp1, 2, 1),
            buffer.getBitsOfField(this.fields.BypassSlaveCmp2, 4, 1));
        vca.depth = buffer.getField(this.fields.TremoloDepth);
        vca.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 4);
        vca.phase = buffer.getBitsOfField(this.fields.PhaseRelationCompressor, 1, 2);
        vca.tempo = Convert.makeWord(
            buffer.getField(this.fields.TremoloPeriodHi),
            buffer.getField(this.fields.TremoloPeriodLo));
        vca.wave = buffer.getBitsOfField(this.fields.FuncTremolo, 3, 3);

        return vca;
    }

    protected deserializeTapTempo(buffer: PresetBuffer): TapTempo {
        const tap = <TapTempo> { };
        tap.mode = buffer.getField(this.fields.TapTempoMode);
        tap.tempoDivision = buffer.getField(this.fields.TapTempoDivision);
        tap.tempoDivisionDelay = buffer.getField(this.fields.TapTempoDivisionDelay);

        return tap;
    }

    protected deserializeMidi(buffer: PresetBuffer): Midi {
        const midi = <Midi> { };
        midi.routing = <MidiRouting> { };
        midi.routing.aux = buffer.getBitsOfField(this.fields.MIDICCRoutingAUXDELAY, 4, 3);
        midi.routing.delay = buffer.getBitsOfField(this.fields.MIDICCRoutingAUXDELAY, 0, 2);
        midi.routing.filter = buffer.getBitsOfField(this.fields.MIDICCRoutingChorusFilter, 0, 4);
        midi.routing.modulation = buffer.getBitsOfField(this.fields.MIDICCRoutingChorusFilter, 4, 2);

        return midi;
    }
}