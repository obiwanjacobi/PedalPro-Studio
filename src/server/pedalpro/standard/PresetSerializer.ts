import { Preset } from "../../model/Preset";
import { PresetBuffer } from "../PresetBuffer";
import { Effects } from "../../model/Effects";
import { CommonPresetSerializer } from "../CommonPresetSerializer";
import { PresetBufferFieldIndex, PresetBufferFields } from "./PresetBufferFields";
import { Distortion } from "../../model/Distortion";

export class PresetSerializer extends CommonPresetSerializer<PresetBufferFieldIndex> {
    public constructor() {
        super(PresetBufferFields);
    }
    
    public serialize(buffer: PresetBuffer, preset: Preset): void {
        super.serializePreset(buffer, preset);
        
        const effects = preset.effects as Effects;
        if (effects) {
            this.serializeDistortion(buffer, effects.distortion);

            super.serializeCompressor(buffer, effects.compressor);
            super.serializeBoost(buffer, effects.boost);
            super.serializeVca(buffer, effects.vca);
            super.serializeNoiseGate(buffer, effects.noiseGate);
            super.serializeVolume(buffer, effects.volume);
            super.serializePhaser(buffer, effects.phaser);
            super.serializeFilters(buffer, effects.filters);
            super.serializeModulation(buffer, effects.modulation);
            super.serializeDelay(buffer, effects.delay);
            super.serializeAux(buffer, effects.aux);
            super.serializeMidi(buffer, effects.midi);
            super.serializeTapTempo(buffer, effects.tap);
        }
    }
    
    private serializeDistortion(buffer: PresetBuffer, dist: Distortion): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !dist.enabled, 6);
        buffer.setBitOfField(this.fields.BypassSlaveCmp2, !dist.bright, 2);
        buffer.setField(this.fields.DistortionOut, dist.level);
        buffer.setBitsOfField(this.fields.CompressorEnvelopeInfo, dist.lowPass, 7, 2);
        buffer.setField(this.fields.DistortionTone, dist.tone);
    }
}