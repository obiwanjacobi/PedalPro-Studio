import { Preset } from "../../model/Preset";
import { PresetBuffer } from "../PresetBuffer";
import { EffectsEx } from "../../model/Effects";
import { CommonPresetSerializer } from "../CommonPresetSerializer";
import { PresetBufferExFieldIndex, PresetBufferExFields } from "./PresetBufferExFields";
import { PreAmp } from "../../model/PreAmp";
import { Dsp, 
    DspType /*, DspDoubleDelay, DoubleDelay, DoubleDelay3, DoubleDelay4, DspCaveDelay, 
    CaveDelay1, CaveDelay2, CaveDelay3, CaveDelay4, 
    DspSingleTap, DspFourTapsDelay, DspTripleDelay, DspPlate, DspCustomSpring, DspHall, DspFreeVerb */
} from "../../model/Dsp";

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
            // dsp.doubleDelay = <DspDoubleDelay> { };
            // dsp.doubleDelay.delay1 = <DoubleDelay> { };
            // dsp.doubleDelay.delay1.delay = ;
            // dsp.doubleDelay.delay1.feedback = ;
            // dsp.doubleDelay.delay1.level = ;
            // dsp.doubleDelay.delay2 = <DoubleDelay> { };
            // dsp.doubleDelay.delay2.delay = ;
            // dsp.doubleDelay.delay3.feedback = ;
            // dsp.doubleDelay.delay2.level = ;
            // dsp.doubleDelay.delay3 = <DoubleDelay3> { };
            // dsp.doubleDelay.delay3.delay = ;
            // dsp.doubleDelay.delay3.feedback = ;
            // dsp.doubleDelay.delay4.level = ;
            // dsp.doubleDelay.delay4 = <DoubleDelay4> { };
            // dsp.doubleDelay.delay4.delay = ;
            // dsp.doubleDelay.delay4.feedback = ;
            // dsp.doubleDelay.delay4.level = ;
            // dsp.doubleDelay.frequency1 = ;
            // dsp.doubleDelay.frequency2 = ;
            // dsp.doubleDelay.frequency3 = ;
            // dsp.doubleDelay.frequency4 = ;
            // dsp.doubleDelay.outL = ;
            // dsp.doubleDelay.outR = ;
            break;
            case DspType.CaveDelay:
            // dsp.caveDelay = <DspCaveDelay> { };
            // dsp.caveDelay.delay1 = <CaveDelay1> { };
            // dsp.caveDelay.delay1.delay = ;
            // dsp.caveDelay.delay1.feedback = ;
            // dsp.caveDelay.delay1.level = ;
            // dsp.caveDelay.delay2 = <CaveDelay2> { };
            // dsp.caveDelay.delay2.delay = ;
            // dsp.caveDelay.delay2.feedback = ;
            // dsp.caveDelay.delay2.level = ;
            // dsp.caveDelay.delay3 = <CaveDelay3> { };
            // dsp.caveDelay.delay3.delay = ;
            // dsp.caveDelay.delay3.feedback = ;
            // dsp.caveDelay.delay3.level = ;
            // dsp.caveDelay.delay4 = <CaveDelay4> { };
            // dsp.caveDelay.delay4.delay = ;
            // dsp.caveDelay.delay4.feedback = ;
            // dsp.caveDelay.delay4.level = ;
            // dsp.caveDelay.frequency1 = ;
            // dsp.caveDelay.frequency2 = ;
            // dsp.caveDelay.frequency3 = ;
            // dsp.caveDelay.frequency4 = ;
            // dsp.caveDelay.outL = ;
            // dsp.caveDelay.outR = ;
            break;
            case DspType.SingleTap:
            // dsp.singleTap = <DspSingleTap> { };
            // dsp.singleTap.feedback = ;
            // dsp.singleTap.lowPassFrequency = ;
            // dsp.singleTap.tempo = ;
            break;
            case DspType.FourTapsDelay:
            // dsp.fourTapsDelay = <DspFourTapsDelay> { };
            // dsp.fourTapsDelay.feedback = ;
            // dsp.fourTapsDelay.frequency = ;
            // dsp.fourTapsDelay.tap1 = ;
            // dsp.fourTapsDelay.tap2 = ;
            // dsp.fourTapsDelay.tap3 = ;
            // dsp.fourTapsDelay.tap4 = ;
            // dsp.fourTapsDelay.tempo = ;
            break;
            case DspType.TripleDelay:
            // dsp.tripleDelay = <DspTripleDelay> { };
            // dsp.tripleDelay.feedback = ;
            // dsp.tripleDelay.frequency = ;
            // dsp.tripleDelay.tap1 = ;
            // dsp.tripleDelay.tap2 = ;
            // dsp.tripleDelay.tap3 = ;
            // dsp.tripleDelay.tap4 = ;
            // dsp.tripleDelay.tempo = ;
            break;
            case DspType.Plate:
            // dsp.plate = <DspPlate> { };
            // dsp.plate.hiPassFrequency = ;
            // dsp.plate.lowPassFrequency = ;
            // dsp.plate.size = ;
            break;
            case DspType.CustomSpring:
            // dsp.customSpring = <DspCustomSpring> { };
            // dsp.customSpring.hiPassFrequency = ;
            // dsp.customSpring.lowPassFrequency = ;
            // dsp.customSpring.time = ;
            break;
            case DspType.Hall:
            // dsp.hall = <DspHall> { };
            // dsp.hall.hiPassFrequency = ;
            // dsp.hall.lowPassFrequency = ;
            // dsp.hall.preDelayTime = ;
            // dsp.hall.reverbTime = ;
            break;
            case DspType.FreeVerb:
            // dsp.freeVerb = <DspFreeVerb> { };
            // dsp.freeVerb.hiPassFrequency = ;
            // dsp.freeVerb.size = ;
            break;
            default:
            break;
        }
    }
}