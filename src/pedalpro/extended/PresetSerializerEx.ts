import PresetBufferEx from "./PresetBufferEx";
import { EmptyPresetBufferEx } from "./EmptyPresetBufferEx";
import Preset from "../../model/Preset";

import { PresetBufferExFields } from "./PresetBufferExFields";
import Compressor from "../../model/Compressor";
import Boost from "../../model/Boost";
import Phaser from "../../model/Phaser";
import NoiseGate from "../../model/NoiseGate";
import Volume from "../../model/Volume";
import Filters, { 
    Filter1, Filter2, AutoFilter1, EnvelopeFilter1, EqFilter1, AutoFilter2, EnvelopeFilter2, EqFilter2 
} from "../../model/Filters";

export default class PresetSerializerEx {
    public static deserialize(buffer: PresetBufferEx): Preset {
        const preset: Preset = <Preset> { };

        preset.data = buffer.formatData();

        preset.name = buffer.name.trim();
        preset.expression = buffer.expression;
        preset.stereo = buffer.stereo;
        preset.empty = EmptyPresetBufferEx.isEmpty(buffer);
        
        return preset;
    }

    public static deserializeCompressor(buffer: PresetBufferEx): Compressor {
        const compressor: Compressor = <Compressor> { };

        // compressor.attack = buffer.getField(PresetBufferExFields.??);
        compressor.enabled = !buffer.bypassCompressor;
        compressor.level = buffer.getField(PresetBufferExFields.CompressorOut);
        compressor.model = buffer.getField(PresetBufferExFields.CompressorModel);
        // compressor.release = buffer.getField(PresetBufferExFields.??);
        compressor.sensitivity = buffer.getField(PresetBufferExFields.CompressorSensitivity);

        return  compressor;
    }

    public static deserializeBoost(buffer: PresetBufferEx): Boost {
        const boost: Boost = <Boost> { };

        boost.enabled = !buffer.bypassBoost;
        boost.gain = buffer.getField(PresetBufferExFields.PreampGain);

        return  boost;
    }

    public static deserializePhaser(buffer: PresetBufferEx): Phaser {
        const phaser: Phaser = <Phaser> { };

        phaser.enabled = !buffer.bypassPhaser;
        phaser.depth = buffer.getField(PresetBufferExFields.PhaserDepth);
        phaser.manual = buffer.getField(PresetBufferExFields.PhaserManual);
        // phaser.phase = buffer.getField(PresetBufferExFields.??);
        // phaser.tempo = MakeWord(
        //     buffer.getField(PresetBufferExFields.PhaserPeriodHi), 
        // buffer.getField(PresetBufferExFields.PhaserPeriodLo));
        // phaser.wave = buffer.getField(PresetBufferExFields.??);

        return  phaser;
    }

    public static deserializeNoiseGate(buffer: PresetBufferEx): NoiseGate {
        const noiseGate: NoiseGate = <NoiseGate> { };

        noiseGate.enabled = !buffer.bypassNoiseGate;
        noiseGate.noiseLevel = buffer.getField(PresetBufferExFields.NoiseGateSensitivity);
        noiseGate.release = buffer.getField(PresetBufferExFields.NoiseGateRelease);
        noiseGate.sustain = buffer.noiseGateSustainOn;

        return  noiseGate;
    }

    public static deserializeVolume(buffer: PresetBufferEx): Volume {
        const volume: Volume = <Volume> { };

        volume.enabled = !buffer.bypassVolume;
        volume.levelL = buffer.getField(PresetBufferExFields.VolumeLeft);
        volume.levelR = buffer.getField(PresetBufferExFields.VolumeRight);

        return  volume;
    }

    public static deserializeFilters(buffer: PresetBufferEx): Filters {
        const filters: Filters = <Filters> { };

        // filters.autoHumanSync = buffer.getField(PresetBufferExFields.HumanSync);
        // filters.routing = buffer.getField(PresetBufferExFields.??);

        filters.filter1 = <Filter1> { };
        filters.filter1.resonance = buffer.getField(PresetBufferExFields.DAQResonanceQ1);
        // filters.filter1.mode = buffer.getField(PresetBufferExFields.??);
        
        filters.filter1.auto = <AutoFilter1> { };
        filters.filter1.auto.maxFrequency = buffer.getField(PresetBufferExFields.Frequency1MaxLo);
        filters.filter1.auto.minFrequency = buffer.getField(PresetBufferExFields.Frequency1MinLo);
        // filters.filter1.auto.phase = buffer.getField(PresetBufferExFields.??);
        // filters.filter1.auto.tempo = buffer.getField(PresetBufferExFields.??);
        // filters.filter1.auto.wave = buffer.getField(PresetBufferExFields.??);
        
        filters.filter1.envelope = <EnvelopeFilter1> { };
        // hi/lo nibble?
        // filters.filter1.envelope.function = buffer.getField(PresetBufferExFields.EnvelopeFunction);   
        filters.filter1.envelope.sensitivity = buffer.getField(PresetBufferExFields.EnvelopeSensitivity1);
        // filters.filter1.envelope.startFrequency = MakeWord(
        //     LoNibble(buffer.getField(PresetBufferExFields.FrequencyStart1HH)), 
        //     buffer.getField(PresetBufferExFields.FrequencyStart1Lo));
        
        filters.filter1.eq = <EqFilter1> { };
        // filters.filter1.eq.resonance = buffer.getField(PresetBufferExFields.??);
        // filters.filter1.eq.enhancedFrequency = buffer.getField(PresetBufferExFields.??);

        filters.filter2 = <Filter2> { };
        filters.filter2.resonance = buffer.getField(PresetBufferExFields.DAQResonanceQ2);

        // filters.filter2.mode = buffer.getField(PresetBufferExFields.??);
        
        filters.filter2.auto = <AutoFilter2> { };
        filters.filter2.auto.maxFrequency = buffer.getField(PresetBufferExFields.Frequency2MaxLo);
        filters.filter2.auto.minFrequency = buffer.getField(PresetBufferExFields.Frequency2MinLo);
        // filters.filter2.auto.phase = buffer.getField(PresetBufferExFields.??);
        // filters.filter2.auto.tempo = buffer.getField(PresetBufferExFields.??);
        // filters.filter2.auto.wave = buffer.getField(PresetBufferExFields.??);
        
        filters.filter2.envelope = <EnvelopeFilter2> { };
        // hi/lo nibble?
        // filters.filter2.envelope.function = buffer.getField(PresetBufferExFields.EnvelopeFunction);  
        filters.filter2.envelope.sensitivity = buffer.getField(PresetBufferExFields.EnvelopeSensitivity2);
        // filters.filter2.envelope.startFrequency = MakeWord(
            // LoNibble(buffer.getField(PresetBufferExFields.FrequencyStart1HH)), 
            // buffer.getField(PresetBufferExFields.FrequencyStart1Lo));
        
        filters.filter2.eq = <EqFilter2> { };
        // filters.filter2.eq.resonance = buffer.getField(PresetBufferExFields.??);
        // filters.filter2.eq.enhancedFrequency = buffer.getField(PresetBufferExFields.??);

        return  filters;
    }
}