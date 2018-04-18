import { Preset } from "../../../model/Preset";
import { PresetBuffer } from "../PresetBuffer";
import { EffectsEx } from "../../../model/Effects";
import { CommonPresetSerializer } from "../CommonPresetSerializer";
import { PresetBufferExFieldIndex, PresetBufferExFields } from "./PresetBufferExFields";
import { PreAmp } from "../../../model/PreAmp";
import { Dsp, DspType } from "../../../model/Dsp";

export class PresetSerializerEx extends CommonPresetSerializer<PresetBufferExFieldIndex> {
    public constructor() {
        super(PresetBufferExFields);
    }

    public serialize(buffer: PresetBuffer, preset: Preset): void {
        super.serializePreset(buffer, preset);

        const effects = preset.effects as EffectsEx;
        if (effects) {
            this.serializePreAmp(buffer, effects.pre);
            this.serializeDsp(buffer, effects.dsp);

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

    private serializePreAmp(buffer: PresetBuffer, preamp: PreAmp): void {
        buffer.setBitOfField(this.fields.BypassSlaveCmp1, !preamp.enabled, 6);
        buffer.setField(this.fields.PreAmpConfig, preamp.routing);

        buffer.setBitOfField(this.fields.DdreamSwitches, !preamp.emphasis.boost, 4);
        buffer.setField(this.fields.EmphasyFrequency, preamp.emphasis.frequency);
        buffer.setField(this.fields.EmphasydB, preamp.emphasis.gain);
        buffer.setField(this.fields.EmphasyHighPass, preamp.emphasis.high);
        buffer.setField(this.fields.EmphasyLowPass, preamp.emphasis.low);
        buffer.setField(this.fields.EmphasyVolume, preamp.emphasis.level);
        buffer.setBitsOfField(this.fields.DdreamSwitches, preamp.emphasis.resonance, 1, 2);

        buffer.setBitsOfField(this.fields.DdreamSwitches, preamp.distortionDiode.type, 7, 3);
        buffer.setField(this.fields.DistortionDiodeHighPass, preamp.distortionDiode.high);
        buffer.setField(this.fields.DistortionDiodeMidPass, preamp.distortionDiode.mid);
        buffer.setField(this.fields.DistortionDiodeLowPass, preamp.distortionDiode.low);
        buffer.setField(this.fields.DistortionDiodeVolume, preamp.distortionDiode.level);

        buffer.setField(this.fields.DistortionFetContour, preamp.distortionFet.contour);
        buffer.setField(this.fields.DistortionFetVolume, preamp.distortionFet.level);

        buffer.setBitOfField(this.fields.DdreamSwitches, !preamp.fuzz.boost, 3);
        buffer.setField(this.fields.DistortionFuzzVolume, preamp.fuzz.level);

        buffer.setField(this.fields.Equalizer60, preamp.equalizer.band60Hz);
        buffer.setField(this.fields.Equalizer125, preamp.equalizer.band125Hz);
        buffer.setField(this.fields.Equalizer250, preamp.equalizer.band250Hz);
        buffer.setField(this.fields.Equalizer500, preamp.equalizer.band500Hz);
        buffer.setField(this.fields.Equalizer1K, preamp.equalizer.band1000Hz);
        buffer.setField(this.fields.Equalizer2K, preamp.equalizer.band2000Hz);
        buffer.setField(this.fields.Equalizer4K, preamp.equalizer.band4000Hz);
        buffer.setField(this.fields.Equalizer8K, preamp.equalizer.band8000Hz);
    }

    private serializeDsp(buffer: PresetBuffer, dsp: Dsp): void {
        buffer.setBitOfField(this.fields.DelayAuxConfig, !dsp.enabled, 7);
        buffer.setField(this.fields.DspAlgorithm, dsp.type);

        if (dsp.enabled) {
            buffer.setField(this.fields.AuxGainL, dsp.input);
            buffer.setField(this.fields.AuxGainR, dsp.input);
            buffer.setField(this.fields.AuxDryL, dsp.dry);
            buffer.setField(this.fields.AuxDryR, dsp.dry);
            buffer.setField(this.fields.AuxWetL, dsp.wet);
            buffer.setField(this.fields.AuxWetR, dsp.wet);
        }

        // params for customizable algorithms
        switch (dsp.type) {
            case DspType.DoubleDelay:
            if (dsp.doubleDelay) {
                buffer.setField(this.fields.Dsp.DoubleDelay.Delay1, dsp.doubleDelay.delay1.delay);
                buffer.setField(this.fields.Dsp.DoubleDelay.Feedback1, dsp.doubleDelay.delay1.feedback);
                buffer.setField(this.fields.Dsp.DoubleDelay.Level1, dsp.doubleDelay.delay1.level);
                buffer.setField(this.fields.Dsp.DoubleDelay.Delay2, dsp.doubleDelay.delay2.delay);
                buffer.setField(this.fields.Dsp.DoubleDelay.Feedback2, dsp.doubleDelay.delay3.feedback);
                buffer.setField(this.fields.Dsp.DoubleDelay.Level2, dsp.doubleDelay.delay2.level);
                buffer.setField(this.fields.Dsp.DoubleDelay.Delay3, dsp.doubleDelay.delay3.delay);
                buffer.setField(this.fields.Dsp.DoubleDelay.Feedback3, dsp.doubleDelay.delay3.feedback);
                buffer.setField(this.fields.Dsp.DoubleDelay.Level3, dsp.doubleDelay.delay4.level);
                buffer.setField(this.fields.Dsp.DoubleDelay.Delay4, dsp.doubleDelay.delay4.delay);
                buffer.setField(this.fields.Dsp.DoubleDelay.Feedback4, dsp.doubleDelay.delay4.feedback);
                buffer.setField(this.fields.Dsp.DoubleDelay.Level4, dsp.doubleDelay.delay4.level);
                buffer.setField(this.fields.Dsp.DoubleDelay.Frequency1, dsp.doubleDelay.frequency1);
                buffer.setField(this.fields.Dsp.DoubleDelay.Frequency2, dsp.doubleDelay.frequency2);
                buffer.setField(this.fields.Dsp.DoubleDelay.FrequencyL, dsp.doubleDelay.frequencyL);
                buffer.setField(this.fields.Dsp.DoubleDelay.FrequencyR, dsp.doubleDelay.frequencyR);
                buffer.setField(this.fields.Dsp.DoubleDelay.OutL, dsp.doubleDelay.outL);
                buffer.setField(this.fields.Dsp.DoubleDelay.OutR, dsp.doubleDelay.outR);
            }
            break;
            case DspType.CaveDelay:
            if (dsp.caveDelay) {
                buffer.setField(this.fields.Dsp.CaveDelay.Delay1, dsp.caveDelay.delay1.delay);
                buffer.setField(this.fields.Dsp.CaveDelay.Feedback1, dsp.caveDelay.delay1.feedback);
                buffer.setField(this.fields.Dsp.CaveDelay.Level1, dsp.caveDelay.delay1.level);
                buffer.setField(this.fields.Dsp.CaveDelay.Delay2, dsp.caveDelay.delay2.delay);
                buffer.setField(this.fields.Dsp.CaveDelay.Feedback2, dsp.caveDelay.delay2.feedback);
                buffer.setField(this.fields.Dsp.CaveDelay.Level2, dsp.caveDelay.delay2.level);
                buffer.setField(this.fields.Dsp.CaveDelay.Delay3, dsp.caveDelay.delay3.delay);
                buffer.setField(this.fields.Dsp.CaveDelay.Feedback3, dsp.caveDelay.delay3.feedback);
                buffer.setField(this.fields.Dsp.CaveDelay.Level3, dsp.caveDelay.delay3.level);
                buffer.setField(this.fields.Dsp.CaveDelay.Delay4, dsp.caveDelay.delay4.delay);
                buffer.setField(this.fields.Dsp.CaveDelay.Feedback4, dsp.caveDelay.delay4.feedback);
                buffer.setField(this.fields.Dsp.CaveDelay.Level4, dsp.caveDelay.delay4.level);
                buffer.setField(this.fields.Dsp.CaveDelay.Frequency1, dsp.caveDelay.frequency1);
                buffer.setField(this.fields.Dsp.CaveDelay.Frequency2, dsp.caveDelay.frequency2);
                buffer.setField(this.fields.Dsp.CaveDelay.FrequencyL, dsp.caveDelay.frequencyL);
                buffer.setField(this.fields.Dsp.CaveDelay.FrequencyR, dsp.caveDelay.frequencyR);
                buffer.setField(this.fields.Dsp.CaveDelay.OutL, dsp.caveDelay.outL);
                buffer.setField(this.fields.Dsp.CaveDelay.OutR, dsp.caveDelay.outR);
            }
            break;
            case DspType.SingleTap:
            if (dsp.singleTap) {
                buffer.setField(this.fields.Dsp.SingleTap.Feedback, dsp.singleTap.feedback);
                buffer.setField(this.fields.Dsp.SingleTap.LoPassFrequency, dsp.singleTap.lowPassFrequency);
                buffer.setField(this.fields.Dsp.SingleTap.Tempo, dsp.singleTap.tempo);
                buffer.setField(this.fields.Dsp.SingleTap.Fixed0x50_1, 0x50);
                buffer.setField(this.fields.Dsp.SingleTap.Fixed0x50_2, 0x50);
                buffer.setField(this.fields.Dsp.SingleTap.Fixed0x50_3, 0x50);
                buffer.setField(this.fields.Dsp.SingleTap.Fixed0x50_4, 0x50);
            }
            break;
            case DspType.FourTapsDelay:
            if (dsp.fourTapsDelay) {
                buffer.setField(this.fields.Dsp.FourTapDelay.Feedback, dsp.fourTapsDelay.feedback);
                buffer.setField(this.fields.Dsp.FourTapDelay.Frequency, dsp.fourTapsDelay.frequency);
                buffer.setField(this.fields.Dsp.FourTapDelay.Tap1, dsp.fourTapsDelay.tap1);
                buffer.setField(this.fields.Dsp.FourTapDelay.Tap2, dsp.fourTapsDelay.tap2);
                buffer.setField(this.fields.Dsp.FourTapDelay.Tap3, dsp.fourTapsDelay.tap3);
                buffer.setField(this.fields.Dsp.FourTapDelay.Tap4, dsp.fourTapsDelay.tap4);
                buffer.setField(this.fields.Dsp.FourTapDelay.Tempo, dsp.fourTapsDelay.tempo);
            }
            break;
            case DspType.TripleDelay:
            if (dsp.tripleDelay) {
                buffer.setField(this.fields.Dsp.TripleDelay.Feedback, dsp.tripleDelay.feedback);
                buffer.setField(this.fields.Dsp.TripleDelay.Frequency, dsp.tripleDelay.frequency);
                buffer.setField(this.fields.Dsp.TripleDelay.Tap1, dsp.tripleDelay.tap1);
                buffer.setField(this.fields.Dsp.TripleDelay.Tap2, dsp.tripleDelay.tap2);
                buffer.setField(this.fields.Dsp.TripleDelay.Tap3, dsp.tripleDelay.tap3);
                buffer.setField(this.fields.Dsp.TripleDelay.Tempo, dsp.tripleDelay.tempo);
                buffer.setField(this.fields.Dsp.TripleDelay.Fixed0x50, 0x50);
            }
            break;
            case DspType.Plate:
            if (dsp.plate) {
                buffer.setField(this.fields.Dsp.Plate.HiPassFrequency, dsp.plate.hiPassFrequency);
                buffer.setField(this.fields.Dsp.Plate.LoPassFrequency, dsp.plate.lowPassFrequency);
                buffer.setField(this.fields.Dsp.Plate.Size, dsp.plate.size);
            }
            break;
            case DspType.CustomSpring:
            if (dsp.customSpring) {
                buffer.setField(this.fields.Dsp.CustomeSpring.HiPassFrequency, dsp.customSpring.hiPassFrequency);
                buffer.setField(this.fields.Dsp.CustomeSpring.LoPassFrequency, dsp.customSpring.lowPassFrequency);
                buffer.setField(this.fields.Dsp.CustomeSpring.Time, dsp.customSpring.time);
            }
            break;
            case DspType.Hall:
            if (dsp.hall) {
                buffer.setField(this.fields.Dsp.Hall.HiPassFrequency, dsp.hall.hiPassFrequency);
                buffer.setField(this.fields.Dsp.Hall.LoPassFrequency, dsp.hall.lowPassFrequency);
                buffer.setField(this.fields.Dsp.Hall.PreDelayTime, dsp.hall.preDelayTime);
                buffer.setField(this.fields.Dsp.Hall.ReverbTime, dsp.hall.reverbTime);
                buffer.setField(this.fields.Dsp.Hall.Fixed0x50_1, 0x50);
                buffer.setField(this.fields.Dsp.Hall.Fixed0x50_2, 0x50);
                buffer.setField(this.fields.Dsp.Hall.Fixed0x7B, 0x7B);
            }
            break;
            case DspType.FreeVerb:
            if (dsp.freeVerb) {
                buffer.setField(this.fields.Dsp.FreeVerb.HiPassFrequency, dsp.freeVerb.hiPassFrequency);
                buffer.setField(this.fields.Dsp.FreeVerb.Size, dsp.freeVerb.size);
            }
            break;
            default:
            break;
        }
    }
}