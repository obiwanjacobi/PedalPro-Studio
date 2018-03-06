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
import PresetTraits from "../../model/PresetTraits";

export default class PresetSerializerEx {
    public static deserialize(buffer: PresetBufferEx): Preset {
        const preset: Preset = <Preset> { };

        preset.data = buffer.formatData();

        preset.name = buffer.name.trim();
        
        preset.traits = PresetSerializerEx.deserializeTraits(buffer);
        
        return preset;
    }

    public static deserializeTraits(buffer: PresetBufferEx): PresetTraits {
        const traits = <PresetTraits> { };

        traits.singleCoil = buffer.singleCoil;
        traits.humbucker = buffer.humbucker;
        traits.expression = buffer.expression;
        traits.stereo = buffer.stereo;

        traits.empty = EmptyPresetBufferEx.isEmpty(buffer);

        return traits;
    }

    public static deserializeCompressor(buffer: PresetBufferEx): Compressor {
        const compressor: Compressor = <Compressor> { };

        // compressor.attack = buffer.getFieldEx(PresetBufferExFields.??);
        compressor.enabled = !buffer.bypassCompressor;
        compressor.level = buffer.getFieldEx(PresetBufferExFields.CompressorOut);
        compressor.model = buffer.getFieldEx(PresetBufferExFields.CompressorModel);
        // compressor.release = buffer.getFieldEx(PresetBufferExFields.??);
        compressor.sensitivity = buffer.getFieldEx(PresetBufferExFields.CompressorSensitivity);

        return  compressor;
    }

    public static deserializeBoost(buffer: PresetBufferEx): Boost {
        const boost: Boost = <Boost> { };

        boost.enabled = !buffer.bypassBoost;
        boost.gain = buffer.getFieldEx(PresetBufferExFields.PreampGain);

        return  boost;
    }

    public static deserializePhaser(buffer: PresetBufferEx): Phaser {
        const phaser: Phaser = <Phaser> { };

        phaser.enabled = !buffer.bypassPhaser;
        phaser.depth = buffer.getFieldEx(PresetBufferExFields.PhaserDepth);
        phaser.manual = buffer.getFieldEx(PresetBufferExFields.PhaserManual);
        // phaser.phase = buffer.getFieldEx(PresetBufferExFields.??);
        // phaser.tempo = MakeWord(
        //     buffer.getFieldEx(PresetBufferExFields.PhaserPeriodHi), 
        // buffer.getFieldEx(PresetBufferExFields.PhaserPeriodLo));
        // phaser.wave = buffer.getFieldEx(PresetBufferExFields.??);

        return  phaser;
    }

    public static deserializeNoiseGate(buffer: PresetBufferEx): NoiseGate {
        const noiseGate: NoiseGate = <NoiseGate> { };

        noiseGate.enabled = !buffer.bypassNoiseGate;
        noiseGate.noiseLevel = buffer.getFieldEx(PresetBufferExFields.NoiseGateSensitivity);
        noiseGate.release = buffer.getFieldEx(PresetBufferExFields.NoiseGateRelease);
        noiseGate.sustain = buffer.noiseGateSustainOn;

        return  noiseGate;
    }

    public static deserializeVolume(buffer: PresetBufferEx): Volume {
        const volume: Volume = <Volume> { };

        volume.enabled = !buffer.bypassVolume;
        volume.levelL = buffer.getFieldEx(PresetBufferExFields.VolumeLeft);
        volume.levelR = buffer.getFieldEx(PresetBufferExFields.VolumeRight);

        return  volume;
    }

    public static deserializeFilters(buffer: PresetBufferEx): Filters {
        const filters: Filters = <Filters> { };

        // filters.autoHumanSync = buffer.getFieldEx(PresetBufferExFields.HumanSync);
        // filters.routing = buffer.getFieldEx(PresetBufferExFields.??);

        filters.filter1 = <Filter1> { };
        filters.filter1.resonance = buffer.getFieldEx(PresetBufferExFields.DAQResonanceQ1);
        // filters.filter1.mode = buffer.getFieldEx(PresetBufferExFields.??);
        
        filters.filter1.auto = <AutoFilter1> { };
        filters.filter1.auto.maxFrequency = buffer.getFieldEx(PresetBufferExFields.Frequency1MaxLo);
        filters.filter1.auto.minFrequency = buffer.getFieldEx(PresetBufferExFields.Frequency1MinLo);
        // filters.filter1.auto.phase = buffer.getFieldEx(PresetBufferExFields.??);
        // filters.filter1.auto.tempo = buffer.getFieldEx(PresetBufferExFields.??);
        // filters.filter1.auto.wave = buffer.getFieldEx(PresetBufferExFields.??);
        
        filters.filter1.envelope = <EnvelopeFilter1> { };
        // hi/lo nibble?
        // filters.filter1.envelope.function = buffer.getFieldEx(PresetBufferExFields.EnvelopeFunction);   
        filters.filter1.envelope.sensitivity = buffer.getFieldEx(PresetBufferExFields.EnvelopeSensitivity1);
        // filters.filter1.envelope.startFrequency = MakeWord(
        //     LoNibble(buffer.getFieldEx(PresetBufferExFields.FrequencyStart1HH)), 
        //     buffer.getFieldEx(PresetBufferExFields.FrequencyStart1Lo));
        
        filters.filter1.eq = <EqFilter1> { };
        // filters.filter1.eq.resonance = buffer.getFieldEx(PresetBufferExFields.??);
        // filters.filter1.eq.enhancedFrequency = buffer.getFieldEx(PresetBufferExFields.??);

        filters.filter2 = <Filter2> { };
        filters.filter2.resonance = buffer.getFieldEx(PresetBufferExFields.DAQResonanceQ2);

        // filters.filter2.mode = buffer.getFieldEx(PresetBufferExFields.??);
        
        filters.filter2.auto = <AutoFilter2> { };
        filters.filter2.auto.maxFrequency = buffer.getFieldEx(PresetBufferExFields.Frequency2MaxLo);
        filters.filter2.auto.minFrequency = buffer.getFieldEx(PresetBufferExFields.Frequency2MinLo);
        // filters.filter2.auto.phase = buffer.getFieldEx(PresetBufferExFields.??);
        // filters.filter2.auto.tempo = buffer.getFieldEx(PresetBufferExFields.??);
        // filters.filter2.auto.wave = buffer.getFieldEx(PresetBufferExFields.??);
        
        filters.filter2.envelope = <EnvelopeFilter2> { };
        // hi/lo nibble?
        // filters.filter2.envelope.function = buffer.getFieldEx(PresetBufferExFields.EnvelopeFunction);  
        filters.filter2.envelope.sensitivity = buffer.getFieldEx(PresetBufferExFields.EnvelopeSensitivity2);
        // filters.filter2.envelope.startFrequency = MakeWord(
            // LoNibble(buffer.getFieldEx(PresetBufferExFields.FrequencyStart1HH)), 
            // buffer.getFieldEx(PresetBufferExFields.FrequencyStart1Lo));
        
        filters.filter2.eq = <EqFilter2> { };
        // filters.filter2.eq.resonance = buffer.getFieldEx(PresetBufferExFields.??);
        // filters.filter2.eq.enhancedFrequency = buffer.getFieldEx(PresetBufferExFields.??);

        return  filters;
    }
}