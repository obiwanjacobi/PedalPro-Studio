import PresetBufferEx from "./PresetBufferEx";
import { EmptyPresetBufferEx } from "./EmptyPresetBufferEx";
import Preset from "../../model/Preset";

import { PresetBufferExFieldIndex, BypassSlaveCmp1Flags } from "./PresetBufferExFields";
import CommonPresetDeserializer from "../CommonPresetDeserializer";
import { EffectsEx } from "../../model/Effects";
import PreAmp, { PreEmphasis, PreDistortionDiode, PreDistortionFet, PreFuzz, PreEqualizer } from "../../model/PreAmp";
import Dsp from "../../model/Dsp";
import Convert from "../Convert";

export default class PresetDeserializerEx extends CommonPresetDeserializer<PresetBufferExFieldIndex> {
    
    public constructor(fields: PresetBufferExFieldIndex) {
        super(fields);
    }

    public deserialize(buffer: PresetBufferEx): Preset {
        const preset: Preset = super.deserializePreset(buffer);
        preset.traits.empty = EmptyPresetBufferEx.isEmpty(buffer);

        const effects = <EffectsEx> { };
        effects.pre = this.deserializePreAmp(buffer);
        effects.dsp = this.deserializeDsp(buffer);

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

    private deserializePreAmp(buffer: PresetBufferEx): PreAmp {
        const preamp = <PreAmp> { };

        preamp.enabled = !Convert.hasFlag(
            buffer.getField(this.fields.BypassSlaveCmp1), BypassSlaveCmp1Flags.BypassPreAmp);
        preamp.routing = buffer.getField(this.fields.PreAmpConfig);

        preamp.emphasis = <PreEmphasis> { };
        preamp.emphasis.boost = !Convert.hasFlag(
            buffer.getField(this.fields.DdreamSwitches), 4);
        preamp.emphasis.frequency = buffer.getField(this.fields.EmphasyFrequency);
        preamp.emphasis.gain = buffer.getField(this.fields.EmphasydB);
        preamp.emphasis.high = buffer.getField(this.fields.EmphasyHighPass);
        preamp.emphasis.low = buffer.getField(this.fields.EmphasyLowPass);
        preamp.emphasis.level = buffer.getField(this.fields.EmphasyVolume);
        preamp.emphasis.resonance = Convert.getBitsOf(
            buffer.getField(this.fields.DdreamSwitches), 1, 2);

        preamp.distortionDiode = <PreDistortionDiode> { };
        preamp.distortionDiode.type = Convert.getBitsOf(
            buffer.getField(this.fields.DdreamSwitches), 7, 3);
        preamp.distortionDiode.high = buffer.getField(this.fields.DistortionDiodeHighPass);
        preamp.distortionDiode.mid = buffer.getField(this.fields.DistortionDiodeMidPass);
        preamp.distortionDiode.low = buffer.getField(this.fields.DistortionDiodeLowPass);
        preamp.distortionDiode.level = buffer.getField(this.fields.DistortionDiodeVolume);

        preamp.distortionFet = <PreDistortionFet> { };
        preamp.distortionFet.contour = buffer.getField(this.fields.DistortionFetContour);
        preamp.distortionFet.level = buffer.getField(this.fields.DistortionFetVolume);

        preamp.fuzz = <PreFuzz> { };
        preamp.fuzz.boost = !Convert.hasFlag(
            buffer.getField(this.fields.DdreamSwitches), 3);
        preamp.fuzz.level = buffer.getField(this.fields.DistortionFuzzVolume);

        preamp.equalizer = <PreEqualizer> { };
        preamp.equalizer.band60Hz = buffer.getField(this.fields.Equalizer60);
        preamp.equalizer.band125Hz = buffer.getField(this.fields.Equalizer125);
        preamp.equalizer.band250Hz = buffer.getField(this.fields.Equalizer250);
        preamp.equalizer.band500Hz = buffer.getField(this.fields.Equalizer500);
        preamp.equalizer.band1000Hz = buffer.getField(this.fields.Equalizer1K);
        preamp.equalizer.band2000Hz = buffer.getField(this.fields.Equalizer2K);
        preamp.equalizer.band4000Hz = buffer.getField(this.fields.Equalizer4K);
        preamp.equalizer.band8000Hz = buffer.getField(this.fields.Equalizer8K);

        return  preamp;
    }

    private deserializeDsp(buffer: PresetBufferEx): Dsp {
        const dsp = <Dsp> { };

        dsp.enabled = false;
        dsp.type = 0;
        dsp.input = 0;
        dsp.dry = 0;
        dsp.wet = 0;
        dsp.data = buffer.formatData(this.fields.DspDataStart, this.fields.DspDataEnd + 1);

        return  dsp;
    }
}