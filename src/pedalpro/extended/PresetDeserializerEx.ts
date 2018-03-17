import Preset from "../../model/Preset";
import { EffectsEx } from "../../model/Effects";
import PreAmp, { PreEmphasis, PreDistortionDiode, PreDistortionFet, PreFuzz, PreEqualizer } from "../../model/PreAmp";
import Dsp, { 
    DspType /*, DspDoubleDelay, DoubleDelay, DoubleDelay3, DoubleDelay4, DspCaveDelay, 
    CaveDelay1, CaveDelay2, CaveDelay3, CaveDelay4, 
    DspSingleTap, DspFourTapsDelay, DspTripleDelay, DspPlate, DspCustomSpring, DspHall, DspFreeVerb */
} from "../../model/Dsp";
import CommonPresetDeserializer from "../CommonPresetDeserializer";
import { EmptyPresetBufferEx } from "./EmptyPresetBufferEx";
import { PresetBufferExFieldIndex, PresetBufferExFields } from "./PresetBufferExFields";
import PresetBuffer from "../PresetBuffer";

export default class PresetDeserializerEx extends CommonPresetDeserializer<PresetBufferExFieldIndex> {
    
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

        dsp.data = buffer.formatData(this.fields.DspDataStart, this.fields.DspDataEnd + 1);

        return  dsp;
    }
}