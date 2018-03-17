import PresetBuffer from "../PresetBuffer";
import Preset from "../../model/Preset";
import { PresetBufferFieldIndex, PresetBufferFields } from "./PresetBufferFields";
import Distortion from "../../model/Distortion";
import CommonPresetDeserializer from "../CommonPresetDeserializer";
import { Effects } from "../../model/Effects";
import { EmptyPresetBuffer } from "./EmptyPresetBuffer";

export default class PresetDeserializer extends CommonPresetDeserializer<PresetBufferFieldIndex> {
    public constructor() {
        super(PresetBufferFields);
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
        effects.midi = super.deserializeMidi(buffer);
        effects.tap = super.deserializeTapTempo(buffer);
        preset.effects = effects;
        
        return preset;
    }
    
    private deserializeDistortion(buffer: PresetBuffer): Distortion {
        const dist = <Distortion> { };
        dist.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 6);
        dist.bright = !buffer.getBitOfField(this.fields.BypassSlaveCmp2, 2);
        dist.level = buffer.getField(this.fields.DistortionOut);
        dist.lowPass = buffer.getBitsOfField(this.fields.CompressorEnvelopeInfo, 7, 2);
        dist.tone = buffer.getField(this.fields.DistortionTone);

        return  dist;
    }
}