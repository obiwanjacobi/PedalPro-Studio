import PresetBuffer from "../PresetBuffer";
import Preset from "../../model/Preset";
import { PresetBufferFieldIndex } from "./PresetBufferFields";
import Distortion from "../../model/Distortion";
import CommonPresetDeserializer from "../CommonPresetDeserializer";
import Convert from "../Convert";
import { BypassSlaveCmp1Flags } from "../Common";
import { Effects } from "../../model/Effects";
import { EmptyPresetBuffer } from "./EmptyPresetBuffer";

export default class PresetDeserializer extends CommonPresetDeserializer<PresetBufferFieldIndex> {
    public constructor(fields: PresetBufferFieldIndex) {
        super(fields);
    }
    
    public deserialize(buffer: PresetBuffer): Preset {
        const preset = super.deserializePreset(buffer);
        preset.traits.empty = EmptyPresetBuffer.isEmpty(buffer);

        const effects = <Effects> { };
        effects.distortion = this.deserializeDistortion(buffer);

        effects.compressor = super.deserializeCompressor(buffer);
        effects.boost = super.deserializeBoost(buffer);
        effects.vca = super.deserializeVca(buffer);
        effects.noiseGate = super.deserializeNoiseGate(buffer);
        effects.volume = super.deserializeVolume(buffer);
        effects.phaser = super.deserializePhaser(buffer);
        effects.filters = super.deserializeFilters(buffer);
        effects.modulation = super.deserializeModulation(buffer);
        effects.delay = super.deserializeDelay(buffer);
        effects.aux = super.deserializeAux(buffer);
        preset.effects = effects;
        
        return preset;
    }
    
    private deserializeDistortion(buffer: PresetBuffer): Distortion {
        const dist = <Distortion> { };

        dist.enabled = !Convert.hasFlag(
            buffer.getField(this.fields.BypassSlaveCmp1), BypassSlaveCmp1Flags.BypassPreAmp);
        // dist.bright = buffer.getField(PresetBufferFields.??);
        dist.level = buffer.getField(this.fields.DistortionOut);
        // dist.lowPass = buffer.getField(PresetBufferFields.??);
        dist.tone = buffer.getField(this.fields.DistortionTone);

        return  dist;
    }
}