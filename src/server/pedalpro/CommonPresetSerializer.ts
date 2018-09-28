import { PresetBuffer } from "./PresetBuffer";
import { Preset } from "../../model/Preset";
import { Compressor } from "../../model/Compressor";
import { Boost } from "../../model/Boost";
import { Phaser } from "../../model/Phaser";
import { NoiseGate } from "../../model/NoiseGate";
import { Volume } from "../../model/Volume";
import { Filters, Filter2Type } from "../../model/Filters";
import { CommonPresetBufferFieldIndex } from "./CommonPresetBufferFieldIndex";
import { Convert } from "./Convert";
import { Modulation, Harmonics } from "../../model/Modulation";
import { Delay } from "../../model/Delay";
import { Aux } from "../../model/AuxRouting";
import { VoltageControlledAmp } from "../../model/VoltageControlledAmp";
import { TapTempo } from "../../model/TapTempo";
import { Midi } from "../../model/Midi";

// tslint:disable:max-line-length

export abstract class CommonPresetSerializer<FieldsT extends CommonPresetBufferFieldIndex> {
    protected readonly fields: FieldsT;

    protected constructor(fields: FieldsT) {
        this.fields = fields;
    }

    protected serializePreset(buffer: PresetBuffer, preset: Preset): void {
         buffer.setName(
            preset.name, 
            preset.traits.singleCoil, 
            preset.traits.humbucker, 
            preset.traits.expression, 
            preset.traits.stereo); 
    }
    
    protected serializeCompressor(buffer: PresetBuffer, compressor: Compressor): void {
        buffer.setBitsOfField(this.fields.CompressorEnvelopeInfo, compressor.attack, 2, 3);
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !compressor.enabled, 5);
        buffer.setField(this.fields.CompressorOut, compressor.level);
        buffer.setField(this.fields.CompressorModel, compressor.model);
        buffer.setBitsOfField(this.fields.CompressorEnvelopeInfo, compressor.release, 5, 3);
        buffer.setField(this.fields.CompressorSensitivity, compressor.sensitivity);
    }

    protected serializeBoost(buffer: PresetBuffer, boost: Boost): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !boost.enabled, 3);
        buffer.setField(this.fields.PreampGain, boost.gain);
    }

    protected serializePhaser(buffer: PresetBuffer, phaser: Phaser): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !phaser.enabled, 7);
        buffer.setField(this.fields.PhaserDepth, phaser.depth);
        buffer.setField(this.fields.PhaserManual, phaser.manual);
        buffer.setBitsOfField(this.fields.PhaseRelationCompressor, phaser.phase, 3, 2);
        buffer.setField(this.fields.PhaserPeriodHi, Convert.hiByte(phaser.tempo));
        buffer.setField(this.fields.PhaserPeriodLo, Convert.loByte(phaser.tempo));
        buffer.setBitsOfField(this.fields.FuncPhaser, phaser.wave, 3, 2);
    }

    protected serializeNoiseGate(buffer: PresetBuffer, noiseGate: NoiseGate): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp2, !noiseGate.enabled, 0);
        buffer.setField(this.fields.NoiseGateSensitivity, noiseGate.noiseLevel);
        buffer.setField(this.fields.NoiseGateRelease, noiseGate.release);
        buffer.setBitOfField(this.fields.BypassSlaveCmp2, !noiseGate.sustain, 1);
    }

    protected serializeVolume(buffer: PresetBuffer, volume: Volume): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !volume.enabled, 4);
        buffer.setField(this.fields.VolumeLeft, volume.levelL);
        buffer.setField(this.fields.VolumeRight, volume.levelR);
    }

    protected serializeFilters(buffer: PresetBuffer, filters: Filters): void {
        buffer.setBitOfField(this.fields.BypassSlaveFilter, !filters.autoHumanSync, 6);
        buffer.setField(this.fields.BypassSlaveRouting, filters.routing);

        // --- Filter 1 ---

        buffer.setField(this.fields.DAQResonanceQ1, filters.filter1.resonance);
        buffer.setBitsOfField(this.fields.FunctionFormant1, filters.filter1.mode, 7, 2);        
 
        buffer.setBitsOfField(this.fields.Frequency1HH, Convert.hiByte(filters.filter1.auto.maxFrequency), 1, 2), 
        buffer.setField(this.fields.Frequency1MaxLo, Convert.loByte(filters.filter1.auto.maxFrequency));
        buffer.setBitsOfField(this.fields.Frequency1HH, Convert.hiByte(filters.filter1.auto.minFrequency), 3, 2);
        buffer.setField(this.fields.Frequency1MinLo, Convert.loByte(filters.filter1.auto.minFrequency));
        buffer.setBitsOfField(this.fields.PhasesRelationFilter, filters.filter1.auto.phase, 1, 2);
        buffer.setField(this.fields.FormantPeriod1Hi, Convert.hiByte(filters.filter1.auto.tempo));
        buffer.setField(this.fields.FormantPeriod1Lo, Convert.loByte(filters.filter1.auto.tempo));
        buffer.setBitsOfField(this.fields.FunctionFormant1, filters.filter1.auto.wave, 3, 3);
        
        buffer.setBitsOfField(this.fields.EnvelopeFunction, filters.filter1.envelope.function, 1, 2);
        buffer.setField(this.fields.EnvelopeSensitivity1, filters.filter1.envelope.sensitivity);
        buffer.setBitsOfField(this.fields.FrequencyStartHH, Convert.hiByte(filters.filter1.envelope.frequency), 1, 2);
        buffer.setField(this.fields.FrequencyStart1Lo, Convert.loByte(filters.filter1.envelope.frequency));
        
        buffer.setBitsOfField(this.fields.DAQFrequencyHH, Convert.hiByte(filters.filter1.eq.frequency), 1, 2),
        buffer.setField(this.fields.DAQFixFrequency1Lo, Convert.loByte(filters.filter1.eq.frequency));

        // --- Filter 2 ---

        buffer.setField(this.fields.DAQResonanceQ2, filters.filter2.resonance);
        buffer.setBitOfField(this.fields.BypassSlaveFilter, filters.filter2.type === Filter2Type.BandPass, 4);
        buffer.setBitsOfField(this.fields.FunctionFormant2, filters.filter2.mode, 7, 2);
        
        buffer.setBitsOfField(this.fields.Frequency2HH, Convert.hiByte(filters.filter2.auto.maxFrequency), 1, 2);
        buffer.setField(this.fields.Frequency2MaxLo, Convert.loByte(filters.filter2.auto.maxFrequency));
        buffer.setBitsOfField(this.fields.Frequency2HH, Convert.hiByte(filters.filter2.auto.minFrequency), 3, 2),
        buffer.setField(this.fields.Frequency2MinLo, Convert.loByte(filters.filter2.auto.minFrequency));
        buffer.setBitsOfField(this.fields.PhasesRelationFilter, filters.filter2.auto.phase, 7, 2);
        buffer.setField(this.fields.FormantPeriod2Hi, Convert.hiByte(filters.filter2.auto.tempo));
        buffer.setField(this.fields.FormantPeriod2Lo, Convert.loByte(filters.filter2.auto.tempo));
        buffer.setBitsOfField(this.fields.FunctionFormant2, filters.filter2.auto.wave, 3, 3);
        
        buffer.setBitsOfField(this.fields.EnvelopeFunction, filters.filter2.envelope.function, 5, 2);
        buffer.setField(this.fields.EnvelopeSensitivity2, filters.filter2.envelope.sensitivity);
        buffer.setBitsOfField(this.fields.FrequencyStartHH, Convert.hiByte(filters.filter2.envelope.frequency), 3, 2);
        buffer.setField(this.fields.FrequencyStart2Lo, Convert.loByte(filters.filter2.envelope.frequency));
        
        buffer.setBitsOfField(this.fields.DAQFrequencyHH, Convert.hiByte(filters.filter2.eq.frequency), 3, 2);
        buffer.setField(this.fields.DAQFixFrequency2Lo, Convert.loByte(filters.filter2.eq.frequency));
    }

    protected serializeModulation(buffer: PresetBuffer, modulation: Modulation): void {
        buffer.setBitsOfField(this.fields.ModulationConfig, modulation.mode, 1, 2);

        buffer.setBitOfField(this.fields.ModulationConfig, !modulation.chorus.bright, 3);
        buffer.setField(this.fields.DetuneChorus, modulation.chorus.depth);
        buffer.setField(this.fields.InChorus, modulation.chorus.level);
        buffer.setBitsOfField(this.fields.PhasesRelationModulation, modulation.chorus.phase, 1, 2);
        buffer.setField(this.fields.ChorusPeriodHi, Convert.hiByte(modulation.chorus.tempo));
        buffer.setField(this.fields.ChorusPeriodLo, Convert.loByte(modulation.chorus.tempo));
        buffer.setBitsOfField(this.fields.FunctionChorus, modulation.chorus.wave, 3, 3);
        buffer.setField(this.fields.WetChorus, modulation.chorus.wet);

        buffer.setBitOfField(this.fields.ModulationConfig, !modulation.vibe.boost, 4);
        buffer.setField(this.fields.DepthTremoloChorus, modulation.vibe.depth);
        buffer.setBitsOfField(this.fields.PhasesRelationModulation, modulation.vibe.phase, 3, 2);
        buffer.setField(this.fields.TremoloChorusPeriodHi, Convert.hiByte(modulation.vibe.tempo)),
        buffer.setField(this.fields.TremoloChorusPeriodLo, Convert.loByte(modulation.vibe.tempo));
        buffer.setBitsOfField(this.fields.FunctionTremoloChorus, modulation.vibe.wave, 3, 3);

        buffer.setField(this.fields.DlyFlanger, modulation.flanger.delay);
        buffer.setField(this.fields.DetuneFlanger, modulation.flanger.depth);
        buffer.setField(this.fields.FeedbackFlanger, modulation.flanger.feedback);
        buffer.setBitOfField(this.fields.ModulationConfig, modulation.flanger.harmonics === Harmonics.Odd, 5);
        buffer.setField(this.fields.FlangerPeriodHi, Convert.hiByte(modulation.flanger.tempo));
        buffer.setField(this.fields.FlangerPeriodLo, Convert.loByte(modulation.flanger.tempo));
        buffer.setBitsOfField(this.fields.FuctionFlanger, modulation.flanger.wave, 3, 3);
        buffer.setField(this.fields.WetFlanger, modulation.flanger.wet);
    }

    protected serializeDelay(buffer: PresetBuffer, delay: Delay): void {
        buffer.setField(this.fields.FeedbackDelay, delay.feedback);
        buffer.setField(this.fields.InDelay, delay.inputLevel);
        buffer.setField(this.fields.OutDelay, delay.outputLevel);
        buffer.setBitsOfField(this.fields.DelayAuxConfig, delay.range, 3, 2);
        buffer.setBitsOfField(this.fields.DelayAuxConfig, delay.routing, 1, 2);
        buffer.setField(this.fields.DelayTime, delay.time);
        buffer.setField(this.fields.WetDelay, delay.wet);

        buffer.setBitOfField(this.fields.DelayAuxConfig, !delay.modulation, 4);
        buffer.setField(this.fields.DepthDelay, delay.modDepth);
        buffer.setField(this.fields.SpeedDelay, delay.modSpeed);
    }

    protected serializeAux(buffer: PresetBuffer, aux: Aux): void {
        buffer.setBitsOfField(this.fields.DelayAuxConfig, aux.routing, 7, 3);
        buffer.setField(this.fields.AuxDryL, aux.mixDryLevelL);
        buffer.setField(this.fields.AuxDryR, aux.mixDryLevelR);
        buffer.setField(this.fields.AuxGainL, aux.mixGainSendL);
        buffer.setField(this.fields.AuxGainR, aux.mixGainSendR);
        buffer.setField(this.fields.AuxWetL, aux.mixWetLevelL);
        buffer.setField(this.fields.AuxWetR, aux.mixWetLevelR);

        buffer.setBitOfField(this.fields.BypassSlaveFilter, !aux.switches.switch1, 0);
        buffer.setBitOfField(this.fields.BypassSlaveFilter, !aux.switches.switch2, 1);
        buffer.setBitOfField(this.fields.BypassSlaveFilter, !aux.switches.switch3, 2);
        buffer.setBitOfField(this.fields.BypassSlaveFilter, !aux.switches.switch4, 3);
    }

    protected serializeVca(buffer: PresetBuffer, vca: VoltageControlledAmp): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, Convert.hasFlag(vca.assign, 0), 2);
        buffer.setBitOfField(this.fields.BypassSlaveCmp2, Convert.hasFlag(vca.assign, 1), 4);
        
        buffer.setField(this.fields.TremoloDepth, vca.depth);
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !vca.enabled, 4);
        buffer.setBitsOfField(this.fields.PhaseRelationCompressor, vca.phase, 1, 2);
        buffer.setField(this.fields.TremoloPeriodHi, Convert.hiByte(vca.tempo)),
        buffer.setField(this.fields.TremoloPeriodLo, Convert.loByte(vca.tempo));
        buffer.setBitsOfField(this.fields.FuncTremolo, vca.wave, 3, 3);
    }

    protected serializeTapTempo(buffer: PresetBuffer, tap: TapTempo): void {
        buffer.setField(this.fields.TapTempoMode, tap.mode);
        buffer.setField(this.fields.TapTempoDivision, tap.tempoDivision);
        buffer.setField(this.fields.TapTempoDivisionDelay, tap.tempoDivisionDelay);
    }

    protected serializeMidi(buffer: PresetBuffer, midi: Midi): void {
        buffer.setBitsOfField(this.fields.MIDICCRoutingAUXDELAY, midi.routing.aux, 4, 3);
        buffer.setBitsOfField(this.fields.MIDICCRoutingAUXDELAY, midi.routing.delay, 0, 2);
        buffer.setBitsOfField(this.fields.MIDICCRoutingChorusFilter, midi.routing.filter, 0, 4);
        buffer.setBitsOfField(this.fields.MIDICCRoutingChorusFilter, midi.routing.modulation, 4, 2);
    }
}