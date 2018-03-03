import PresetBuffer from "./PresetBuffer";
import { EmptyPresetBuffer } from "./EmptyPresetBuffer";
import Preset from "../../model/Preset";
import Compressor from "../../model/Compressor";
import { PresetBufferFields } from "./PresetBufferFields";
import Boost from "../../model/Boost";
import Distortion from "../../model/Distortion";
import Phaser from "../../model/Phaser";
import NoiseGate from "../../model/NoiseGate";
import Volume from "../../model/Volume";
import Filters, { 
    Filter1, Filter2, AutoFilter1, EnvelopeFilter1, EqFilter1, AutoFilter2, EnvelopeFilter2, EqFilter2 
} from "../../model/Filters";

export default class PresetSerializer {
    public static deserialize(buffer: PresetBuffer): Preset {
        const preset: Preset = <Preset> { };

        preset.data = buffer.formatData();

        preset.name = buffer.name.trim();
        preset.expression = buffer.expression;
        preset.stereo = buffer.stereo;
        preset.empty = EmptyPresetBuffer.isEmpty(buffer);
        
        return preset;
    }

    public static deserializeCompressor(buffer: PresetBuffer): Compressor {
        const compressor: Compressor = <Compressor> { };

        // compressor.attack = buffer.getField(PresetBufferFields.??);
        compressor.enabled = !buffer.bypassCompressor;
        compressor.level = buffer.getField(PresetBufferFields.CompressorOut);
        compressor.model = buffer.getField(PresetBufferFields.CompressorModel);
        // compressor.release = buffer.getField(PresetBufferFields.??);
        compressor.sensitivity = buffer.getField(PresetBufferFields.CompressorSensitivity);

        return  compressor;
    }

    public static deserializeBoost(buffer: PresetBuffer): Boost {
        const boost: Boost = <Boost> { };

        boost.enabled = !buffer.bypassBoost;
        boost.gain = buffer.getField(PresetBufferFields.PreampGain);

        return  boost;
    }

    public static deserializeDistortion(buffer: PresetBuffer): Distortion {
        const dist: Distortion = <Distortion> { };

        dist.enabled = !buffer.bypassDistortion;
        // dist.bright = buffer.getField(PresetBufferFields.??);
        dist.level = buffer.getField(PresetBufferFields.DistortionOut);
        // dist.lowPass = buffer.getField(PresetBufferFields.??);
        dist.tone = buffer.getField(PresetBufferFields.DistortionTone);

        return  dist;
    }

    public static deserializePhaser(buffer: PresetBuffer): Phaser {
        const phaser: Phaser = <Phaser> { };

        phaser.enabled = !buffer.bypassPhaser;
        phaser.depth = buffer.getField(PresetBufferFields.PhaserDepth);
        phaser.manual = buffer.getField(PresetBufferFields.PhaserManual);
        // phaser.phase = buffer.getField(PresetBufferFields.??);
        // phaser.tempo = MakeWord(
        //     buffer.getField(PresetBufferFields.PhaserPeriodHi), buffer.getField(PresetBufferFields.PhaserPeriodLo));
        // phaser.wave = buffer.getField(PresetBufferFields.??);

        return  phaser;
    }

    public static deserializeNoiseGate(buffer: PresetBuffer): NoiseGate {
        const noiseGate: NoiseGate = <NoiseGate> { };

        noiseGate.enabled = !buffer.bypassNoiseGate;
        noiseGate.noiseLevel = buffer.getField(PresetBufferFields.NoiseGateSensitivity);
        noiseGate.release = buffer.getField(PresetBufferFields.NoiseGateRelease);
        noiseGate.sustain = buffer.noiseGateSustainOn;

        return  noiseGate;
    }

    public static deserializeVolume(buffer: PresetBuffer): Volume {
        const volume: Volume = <Volume> { };

        volume.enabled = !buffer.bypassVolume;
        volume.levelL = buffer.getField(PresetBufferFields.VolumeLeft);
        volume.levelR = buffer.getField(PresetBufferFields.VolumeRight);

        return  volume;
    }

    public static deserializeFilters(buffer: PresetBuffer): Filters {
        const filters: Filters = <Filters> { };

        // filters.autoHumanSync = buffer.getField(PresetBufferFields.??);
        // filters.routing = buffer.getField(PresetBufferFields.??);

        filters.filter1 = <Filter1> { };
        filters.filter1.resonance = buffer.getField(PresetBufferFields.DAQResonanceQ1);
        // filters.filter1.mode = buffer.getField(PresetBufferFields.??);
        
        filters.filter1.auto = <AutoFilter1> { };
        filters.filter1.auto.maxFrequency = buffer.getField(PresetBufferFields.Frequency1MaxLo);
        filters.filter1.auto.minFrequency = buffer.getField(PresetBufferFields.Frequency1MinLo);
        // filters.filter1.auto.phase = buffer.getField(PresetBufferFields.??);
        // filters.filter1.auto.tempo = buffer.getField(PresetBufferFields.??);
        // filters.filter1.auto.wave = buffer.getField(PresetBufferFields.??);
        
        filters.filter1.envelope = <EnvelopeFilter1> { };
        // filters.filter1.envelope.function = buffer.getField(PresetBufferFields.EnvelopeFunction);   // hi/lo nibble?
        filters.filter1.envelope.sensitivity = buffer.getField(PresetBufferFields.EnvelopeSensitivity1);
        // filters.filter1.envelope.startFrequency = MakeWord(
        //     LoNibble(buffer.getField(PresetBufferFields.FrequencyStart1HH)), 
        //     buffer.getField(PresetBufferFields.FrequencyStart1Lo));
        
        filters.filter1.eq = <EqFilter1> { };
        // filters.filter1.eq.resonance = buffer.getField(PresetBufferFields.??);
        // filters.filter1.eq.enhancedFrequency = buffer.getField(PresetBufferFields.??);

        filters.filter2 = <Filter2> { };
        filters.filter2.resonance = buffer.getField(PresetBufferFields.DAQResonanceQ2);

        // filters.filter2.mode = buffer.getField(PresetBufferFields.??);
        
        filters.filter2.auto = <AutoFilter2> { };
        filters.filter2.auto.maxFrequency = buffer.getField(PresetBufferFields.Frequency2MaxLo);
        filters.filter2.auto.minFrequency = buffer.getField(PresetBufferFields.Frequency2MinLo);
        // filters.filter2.auto.phase = buffer.getField(PresetBufferFields.??);
        // filters.filter2.auto.tempo = buffer.getField(PresetBufferFields.??);
        // filters.filter2.auto.wave = buffer.getField(PresetBufferFields.??);
        
        filters.filter2.envelope = <EnvelopeFilter2> { };
        // filters.filter2.envelope.function = buffer.getField(PresetBufferFields.EnvelopeFunction);   // hi/lo nibble?
        filters.filter2.envelope.sensitivity = buffer.getField(PresetBufferFields.EnvelopeSensitivity2);
        // filters.filter2.envelope.startFrequency = MakeWord(
            // LoNibble(buffer.getField(PresetBufferFields.FrequencyStart1HH)), 
            // buffer.getField(PresetBufferFields.FrequencyStart1Lo));
        
        filters.filter2.eq = <EqFilter2> { };
        // filters.filter2.eq.resonance = buffer.getField(PresetBufferFields.??);
        // filters.filter2.eq.enhancedFrequency = buffer.getField(PresetBufferFields.??);

        return  filters;
    }
}