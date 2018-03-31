import { Preset } from "../../model/Preset";
import { EffectsEx } from "../../model/Effects";
import { PreAmp, PreEmphasis, PreDistortionDiode, PreDistortionFet, PreFuzz, PreEqualizer } from "../../model/PreAmp";
import { Dsp, 
    DspType, DspDoubleDelay, DoubleDelay, DoubleDelay3, DoubleDelay4, DspCaveDelay, 
    CaveDelay1, CaveDelay2, CaveDelay3, CaveDelay4, 
    DspSingleTap, DspFourTapsDelay, DspTripleDelay, DspPlate, DspCustomSpring, DspHall, DspFreeVerb
} from "../../model/Dsp";
import { CommonPresetDeserializer } from "../CommonPresetDeserializer";
import { EmptyPresetBufferEx } from "./EmptyPresetBufferEx";
import { PresetBufferExFieldIndex, PresetBufferExFields } from "./PresetBufferExFields";
import { PresetBuffer } from "../PresetBuffer";

export class PresetDeserializerEx extends CommonPresetDeserializer<PresetBufferExFieldIndex> {
    
    public constructor() {
        super(PresetBufferExFields);
    }

    public deserialize(buffer: PresetBuffer): Preset {
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
        effects.midi = super.deserializeMidi(buffer);
        effects.tap = super.deserializeTapTempo(buffer);
        preset.effects = effects;

        return preset;
    }

    private deserializePreAmp(buffer: PresetBuffer): PreAmp {
        const preamp = <PreAmp> { };
        preamp.enabled = !buffer.getBitOfField(this.fields.BypassSlaveCmp1, 6);
        preamp.routing = buffer.getField(this.fields.PreAmpConfig);

        preamp.emphasis = <PreEmphasis> { };
        preamp.emphasis.boost = !buffer.getBitOfField(this.fields.DdreamSwitches, 4);
        preamp.emphasis.frequency = buffer.getField(this.fields.EmphasyFrequency);
        preamp.emphasis.gain = buffer.getField(this.fields.EmphasydB);
        preamp.emphasis.high = buffer.getField(this.fields.EmphasyHighPass);
        preamp.emphasis.low = buffer.getField(this.fields.EmphasyLowPass);
        preamp.emphasis.level = buffer.getField(this.fields.EmphasyVolume);
        preamp.emphasis.resonance = buffer.getBitsOfField(this.fields.DdreamSwitches, 1, 2);

        preamp.distortionDiode = <PreDistortionDiode> { };
        preamp.distortionDiode.type = buffer.getBitsOfField(this.fields.DdreamSwitches, 7, 3);
        preamp.distortionDiode.high = buffer.getField(this.fields.DistortionDiodeHighPass);
        preamp.distortionDiode.mid = buffer.getField(this.fields.DistortionDiodeMidPass);
        preamp.distortionDiode.low = buffer.getField(this.fields.DistortionDiodeLowPass);
        preamp.distortionDiode.level = buffer.getField(this.fields.DistortionDiodeVolume);

        preamp.distortionFet = <PreDistortionFet> { };
        preamp.distortionFet.contour = buffer.getField(this.fields.DistortionFetContour);
        preamp.distortionFet.level = buffer.getField(this.fields.DistortionFetVolume);

        preamp.fuzz = <PreFuzz> { };
        preamp.fuzz.boost = !buffer.getBitOfField(this.fields.DdreamSwitches, 3);
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

    private deserializeDsp(buffer: PresetBuffer): Dsp {
        const dsp = <Dsp> { };
        dsp.enabled = buffer.getBitOfField(this.fields.DelayAuxConfig, 7);
        dsp.type = buffer.getField(this.fields.DspAlgorithm);

        if (dsp.enabled) {
            dsp.input = buffer.getField(this.fields.AuxGainL);
            dsp.dry = buffer.getField(this.fields.AuxDryL);
            dsp.wet = buffer.getField(this.fields.AuxWetL);
        } else {
            dsp.input = 0;
            dsp.dry = 0;
            dsp.wet = 0;
        }

        // params for customizable algorithms
        switch (dsp.type) {
            case DspType.DoubleDelay:
            dsp.doubleDelay = <DspDoubleDelay> { };
            dsp.doubleDelay.delay1 = <DoubleDelay> { };
            dsp.doubleDelay.delay1.delay = buffer.getField(this.fields.Dsp.DoubleDelay.Delay1);
            dsp.doubleDelay.delay1.feedback = buffer.getField(this.fields.Dsp.DoubleDelay.Feedback1);
            dsp.doubleDelay.delay1.level = buffer.getField(this.fields.Dsp.DoubleDelay.Level1);
            dsp.doubleDelay.delay2 = <DoubleDelay> { };
            dsp.doubleDelay.delay2.delay = buffer.getField(this.fields.Dsp.DoubleDelay.Delay2);
            dsp.doubleDelay.delay2.feedback = buffer.getField(this.fields.Dsp.DoubleDelay.Feedback2);
            dsp.doubleDelay.delay2.level = buffer.getField(this.fields.Dsp.DoubleDelay.Level2);
            dsp.doubleDelay.delay3 = <DoubleDelay3> { };
            dsp.doubleDelay.delay3.delay = buffer.getField(this.fields.Dsp.DoubleDelay.Delay3);
            dsp.doubleDelay.delay3.feedback = buffer.getField(this.fields.Dsp.DoubleDelay.Feedback3);
            dsp.doubleDelay.delay3.level = buffer.getField(this.fields.Dsp.DoubleDelay.Level3);
            dsp.doubleDelay.delay4 = <DoubleDelay4> { };
            dsp.doubleDelay.delay4.delay = buffer.getField(this.fields.Dsp.DoubleDelay.Delay4);
            dsp.doubleDelay.delay4.feedback = buffer.getField(this.fields.Dsp.DoubleDelay.Feedback4);
            dsp.doubleDelay.delay4.level = buffer.getField(this.fields.Dsp.DoubleDelay.Level4);
            dsp.doubleDelay.frequency1 = buffer.getField(this.fields.Dsp.DoubleDelay.Frequency1);
            dsp.doubleDelay.frequency2 = buffer.getField(this.fields.Dsp.DoubleDelay.Frequency2);
            dsp.doubleDelay.frequencyL = buffer.getField(this.fields.Dsp.DoubleDelay.FrequencyL);
            dsp.doubleDelay.frequencyR = buffer.getField(this.fields.Dsp.DoubleDelay.FrequencyR);
            dsp.doubleDelay.outL = buffer.getField(this.fields.Dsp.DoubleDelay.OutL);
            dsp.doubleDelay.outR = buffer.getField(this.fields.Dsp.DoubleDelay.OutR);
            break;
            case DspType.CaveDelay:
            dsp.caveDelay = <DspCaveDelay> { };
            dsp.caveDelay.delay1 = <CaveDelay1> { };
            dsp.caveDelay.delay1.delay = buffer.getField(this.fields.Dsp.CaveDelay.Delay1);
            dsp.caveDelay.delay1.feedback = buffer.getField(this.fields.Dsp.CaveDelay.Feedback1);
            dsp.caveDelay.delay1.level = buffer.getField(this.fields.Dsp.CaveDelay.Level1);
            dsp.caveDelay.delay2 = <CaveDelay2> { };
            dsp.caveDelay.delay2.delay = buffer.getField(this.fields.Dsp.CaveDelay.Delay2);
            dsp.caveDelay.delay2.feedback = buffer.getField(this.fields.Dsp.CaveDelay.Feedback2);
            dsp.caveDelay.delay2.level = buffer.getField(this.fields.Dsp.CaveDelay.Level2);
            dsp.caveDelay.delay3 = <CaveDelay3> { };
            dsp.caveDelay.delay3.delay = buffer.getField(this.fields.Dsp.CaveDelay.Delay3);
            dsp.caveDelay.delay3.feedback = buffer.getField(this.fields.Dsp.CaveDelay.Feedback3);
            dsp.caveDelay.delay3.level = buffer.getField(this.fields.Dsp.CaveDelay.Level3);
            dsp.caveDelay.delay4 = <CaveDelay4> { };
            dsp.caveDelay.delay4.delay = buffer.getField(this.fields.Dsp.CaveDelay.Delay4);
            dsp.caveDelay.delay4.feedback = buffer.getField(this.fields.Dsp.CaveDelay.Feedback4);
            dsp.caveDelay.delay4.level = buffer.getField(this.fields.Dsp.CaveDelay.Level4);
            dsp.caveDelay.frequency1 = buffer.getField(this.fields.Dsp.CaveDelay.Frequency1);
            dsp.caveDelay.frequency2 = buffer.getField(this.fields.Dsp.CaveDelay.Frequency2);
            dsp.caveDelay.frequencyL = buffer.getField(this.fields.Dsp.CaveDelay.FrequencyL);
            dsp.caveDelay.frequencyR = buffer.getField(this.fields.Dsp.CaveDelay.FrequencyR);
            dsp.caveDelay.outL = buffer.getField(this.fields.Dsp.CaveDelay.OutL);
            dsp.caveDelay.outR = buffer.getField(this.fields.Dsp.CaveDelay.OutR);
            break;
            case DspType.SingleTap:
            dsp.singleTap = <DspSingleTap> { };
            dsp.singleTap.feedback = buffer.getField(this.fields.Dsp.SingleTap.Feedback);
            dsp.singleTap.lowPassFrequency = buffer.getField(this.fields.Dsp.SingleTap.LoPassFrequency);
            dsp.singleTap.tempo = buffer.getField(this.fields.Dsp.SingleTap.Tempo);
            break;
            case DspType.FourTapsDelay:
            dsp.fourTapsDelay = <DspFourTapsDelay> { };
            dsp.fourTapsDelay.feedback = buffer.getField(this.fields.Dsp.FourTapDelay.Feedback);
            dsp.fourTapsDelay.frequency = buffer.getField(this.fields.Dsp.FourTapDelay.Frequency);
            dsp.fourTapsDelay.tap1 = buffer.getField(this.fields.Dsp.FourTapDelay.Tap1);
            dsp.fourTapsDelay.tap2 = buffer.getField(this.fields.Dsp.FourTapDelay.Tap2);
            dsp.fourTapsDelay.tap3 = buffer.getField(this.fields.Dsp.FourTapDelay.Tap3);
            dsp.fourTapsDelay.tap4 = buffer.getField(this.fields.Dsp.FourTapDelay.Tap4);
            dsp.fourTapsDelay.tempo = buffer.getField(this.fields.Dsp.FourTapDelay.Tempo);
            break;
            case DspType.TripleDelay:
            dsp.tripleDelay = <DspTripleDelay> { };
            dsp.tripleDelay.feedback = buffer.getField(this.fields.Dsp.TripleDelay.Feedback);
            dsp.tripleDelay.frequency = buffer.getField(this.fields.Dsp.TripleDelay.Frequency);
            dsp.tripleDelay.tap1 = buffer.getField(this.fields.Dsp.TripleDelay.Tap1);
            dsp.tripleDelay.tap2 = buffer.getField(this.fields.Dsp.TripleDelay.Tap2);
            dsp.tripleDelay.tap3 = buffer.getField(this.fields.Dsp.TripleDelay.Tap3);
            dsp.tripleDelay.tempo = buffer.getField(this.fields.Dsp.TripleDelay.Tempo);
            break;
            case DspType.Plate:
            dsp.plate = <DspPlate> { };
            dsp.plate.hiPassFrequency = buffer.getField(this.fields.Dsp.Plate.HiPassFrequency);
            dsp.plate.lowPassFrequency = buffer.getField(this.fields.Dsp.Plate.LoPassFrequency);
            dsp.plate.size = buffer.getField(this.fields.Dsp.Plate.Size);
            break;
            case DspType.CustomSpring:
            dsp.customSpring = <DspCustomSpring> { };
            dsp.customSpring.hiPassFrequency = buffer.getField(this.fields.Dsp.CustomeSpring.HiPassFrequency);
            dsp.customSpring.lowPassFrequency = buffer.getField(this.fields.Dsp.CustomeSpring.LoPassFrequency);
            dsp.customSpring.time = buffer.getField(this.fields.Dsp.CustomeSpring.Time);
            break;
            case DspType.Hall:
            dsp.hall = <DspHall> { };
            dsp.hall.hiPassFrequency = buffer.getField(this.fields.Dsp.Hall.HiPassFrequency);
            dsp.hall.lowPassFrequency = buffer.getField(this.fields.Dsp.Hall.LoPassFrequency);
            dsp.hall.preDelayTime = buffer.getField(this.fields.Dsp.Hall.PreDelayTime);
            dsp.hall.reverbTime = buffer.getField(this.fields.Dsp.Hall.ReverbTime);
            break;
            case DspType.FreeVerb:
            dsp.freeVerb = <DspFreeVerb> { };
            dsp.freeVerb.hiPassFrequency = buffer.getField(this.fields.Dsp.FreeVerb.HiPassFrequency);
            dsp.freeVerb.size = buffer.getField(this.fields.Dsp.FreeVerb.Size);
            break;
            default:
            break;
        }

        // dsp.data = buffer.formatData(this.fields.DspDataStart, this.fields.DspDataEnd + 1);

        return  dsp;
    }
}