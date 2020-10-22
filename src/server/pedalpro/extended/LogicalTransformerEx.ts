import { CommonLogicalTransformer } from "../CommonLogicalTransformer";
import { EffectsEx } from "../../../model/Effects";
import { Preset } from "../../../model/Preset";
import { PreAmp } from "../../../model/PreAmp";
import { Dsp, DspType } from "../../../model/Dsp";
import { Convert } from "../Convert";
import { DspConvert } from "./DspConvert";

export class LogicalTransformerEx {
    public static presetToLogical(preset: Preset) {
        LogicalTransformerEx.effectsToLogical(<EffectsEx> preset.effects);
    }

    public static presetFromLogical(preset: Preset) {
        LogicalTransformerEx.effectsFromLogical(<EffectsEx> preset.effects);
    }

    private static effectsToLogical(effects: EffectsEx) {
        CommonLogicalTransformer.compressorToLogical(effects.compressor);
        CommonLogicalTransformer.boostToLogical(effects.boost);
        CommonLogicalTransformer.noiseGateToLogical(effects.noiseGate);
        CommonLogicalTransformer.vcaToLogical(effects.vca);
        CommonLogicalTransformer.phaserToLogical(effects.phaser);
        CommonLogicalTransformer.filtersToLogical(effects.filters);
        CommonLogicalTransformer.volumeToLogical(effects.volume);
        CommonLogicalTransformer.modulationToLogical(effects.modulation);
        CommonLogicalTransformer.delayToLogical(effects.delay);
        CommonLogicalTransformer.auxToLogical(effects.aux);

        LogicalTransformerEx.preAmpToLogical(effects.pre);
        LogicalTransformerEx.dspToLogical(effects.dsp);
    }

    private static effectsFromLogical(effects: EffectsEx) {
        CommonLogicalTransformer.compressorFromLogical(effects.compressor);
        CommonLogicalTransformer.boostFromLogical(effects.boost);
        CommonLogicalTransformer.noiseGateFromLogical(effects.noiseGate);
        CommonLogicalTransformer.vcaFromLogical(effects.vca);
        CommonLogicalTransformer.phaserFromLogical(effects.phaser);
        CommonLogicalTransformer.filtersFromLogical(effects.filters);
        CommonLogicalTransformer.volumeFromLogical(effects.volume);
        CommonLogicalTransformer.modulationFromLogical(effects.modulation);
        CommonLogicalTransformer.delayFromLogical(effects.delay);
        CommonLogicalTransformer.auxFromLogical(effects.aux);

        LogicalTransformerEx.preAmpFromLogical(effects.pre);
        LogicalTransformerEx.dspFromLogical(effects.dsp);
    }

    private static preAmpToLogical(pre: PreAmp) {
        pre.emphasis.frequency = Convert.toEmphasisFrequency(pre.emphasis.frequency);
        pre.emphasis.gain = Convert.toLogDB(pre.emphasis.gain);
        pre.emphasis.low = Convert.toPercent(pre.emphasis.low);
        pre.emphasis.high = Convert.toPercent(pre.emphasis.high);
        pre.emphasis.level = Convert.toPercent(pre.emphasis.level);

        pre.distortionDiode.level = Convert.toPercent(pre.distortionDiode.level);
        pre.distortionDiode.low = Convert.toPercent(pre.distortionDiode.low);
        pre.distortionDiode.mid = Convert.toPercent(pre.distortionDiode.mid);
        pre.distortionDiode.high = Convert.toPercent(pre.distortionDiode.high);

        pre.distortionFet.contour = Convert.toPercent(pre.distortionFet.contour);
        pre.distortionFet.level = Convert.toPercent(pre.distortionFet.level);

        pre.fuzz.level = Convert.toPercent(pre.fuzz.level);

        pre.equalizer.band60Hz = Convert.toLogDB(pre.equalizer.band60Hz);
        pre.equalizer.band125Hz = Convert.toLogDB(pre.equalizer.band125Hz);
        pre.equalizer.band250Hz = Convert.toLogDB(pre.equalizer.band250Hz);
        pre.equalizer.band500Hz = Convert.toLogDB(pre.equalizer.band500Hz);
        pre.equalizer.band1000Hz = Convert.toLogDB(pre.equalizer.band1000Hz);
        pre.equalizer.band2000Hz = Convert.toLogDB(pre.equalizer.band2000Hz);
        pre.equalizer.band4000Hz = Convert.toLogDB(pre.equalizer.band4000Hz);
        pre.equalizer.band8000Hz = Convert.toLogDB(pre.equalizer.band8000Hz);
    }

    private static preAmpFromLogical(pre: PreAmp) {
        pre.emphasis.frequency = Convert.fromEmphasisFrequency(pre.emphasis.frequency);
        pre.emphasis.gain = Convert.fromLogDB(pre.emphasis.gain);
        pre.emphasis.low = Convert.fromPercent(pre.emphasis.low);
        pre.emphasis.high = Convert.fromPercent(pre.emphasis.high);
        pre.emphasis.level = Convert.fromPercent(pre.emphasis.level);

        pre.distortionDiode.level = Convert.fromPercent(pre.distortionDiode.level);
        pre.distortionDiode.low = Convert.fromPercent(pre.distortionDiode.low);
        pre.distortionDiode.mid = Convert.fromPercent(pre.distortionDiode.mid);
        pre.distortionDiode.high = Convert.fromPercent(pre.distortionDiode.high);

        pre.distortionFet.contour = Convert.fromPercent(pre.distortionFet.contour);
        pre.distortionFet.level = Convert.fromPercent(pre.distortionFet.level);

        pre.fuzz.level = Convert.fromPercent(pre.fuzz.level);

        pre.equalizer.band60Hz = Convert.fromLogDB(pre.equalizer.band60Hz);
        pre.equalizer.band125Hz = Convert.fromLogDB(pre.equalizer.band125Hz);
        pre.equalizer.band250Hz = Convert.fromLogDB(pre.equalizer.band250Hz);
        pre.equalizer.band500Hz = Convert.fromLogDB(pre.equalizer.band500Hz);
        pre.equalizer.band1000Hz = Convert.fromLogDB(pre.equalizer.band1000Hz);
        pre.equalizer.band2000Hz = Convert.fromLogDB(pre.equalizer.band2000Hz);
        pre.equalizer.band4000Hz = Convert.fromLogDB(pre.equalizer.band4000Hz);
        pre.equalizer.band8000Hz = Convert.fromLogDB(pre.equalizer.band8000Hz);
    }

    private static dspToLogical(dsp: Dsp) {
        dsp.input = Convert.toPercent(dsp.input);
        dsp.dry = Convert.toPercent(dsp.dry);
        dsp.wet = Convert.toPercent(dsp.wet);

        switch (dsp.type) {
            case DspType.CaveDelay:
            if (dsp.caveDelay) {
                dsp.caveDelay.delay1.delay = DspConvert.restrictCaveDelay1(dsp.caveDelay.delay1.delay);
                dsp.caveDelay.delay1.feedback = DspConvert.toFeedback(dsp.caveDelay.delay1.feedback);
                dsp.caveDelay.delay1.level = DspConvert.restrictPercent(dsp.caveDelay.delay1.level);
                dsp.caveDelay.delay2.delay = DspConvert.restrictCaveDelay2(dsp.caveDelay.delay2.delay);
                dsp.caveDelay.delay2.feedback = DspConvert.toFeedback(dsp.caveDelay.delay2.feedback);
                dsp.caveDelay.delay2.level = DspConvert.restrictPercent(dsp.caveDelay.delay2.level);
                dsp.caveDelay.delay3.delay = DspConvert.restrictCaveDelay3(dsp.caveDelay.delay3.delay);
                dsp.caveDelay.delay3.feedback = DspConvert.toFeedback(dsp.caveDelay.delay3.feedback);
                dsp.caveDelay.delay3.level = DspConvert.restrictPercent(dsp.caveDelay.delay3.level);
                dsp.caveDelay.delay4.delay = DspConvert.toCaveDelay4(dsp.caveDelay.delay4.delay);
                dsp.caveDelay.delay4.feedback = DspConvert.toFeedback(dsp.caveDelay.delay4.feedback);
                dsp.caveDelay.delay4.level = DspConvert.restrictPercent(dsp.caveDelay.delay4.level);
                dsp.caveDelay.frequency1 = DspConvert.toFrequency(dsp.caveDelay.frequency1);
                dsp.caveDelay.frequency2 = DspConvert.toFrequency(dsp.caveDelay.frequency2);
                dsp.caveDelay.frequencyL = DspConvert.toFrequency(dsp.caveDelay.frequencyL);
                dsp.caveDelay.frequencyR = DspConvert.toFrequency(dsp.caveDelay.frequencyR);
                dsp.caveDelay.outL = DspConvert.toBalance(dsp.caveDelay.outL);
                dsp.caveDelay.outR = DspConvert.toBalance(dsp.caveDelay.outR);
            }
            break;
            case DspType.CustomSpring:
            if (dsp.customSpring) {
                dsp.customSpring.hiPassFrequency = DspConvert.toFrequency(dsp.customSpring.hiPassFrequency);
                dsp.customSpring.lowPassFrequency = DspConvert.toFrequency(dsp.customSpring.lowPassFrequency);
                dsp.customSpring.time = DspConvert.restrictTime(dsp.customSpring.time);
            }
            break;
            case DspType.DoubleDelay:
            if (dsp.doubleDelay) {
                dsp.doubleDelay.delay1.delay = DspConvert.restrictDelay1(dsp.doubleDelay.delay1.delay);
                dsp.doubleDelay.delay1.feedback = DspConvert.toFeedback(dsp.doubleDelay.delay1.feedback);
                dsp.doubleDelay.delay1.level = DspConvert.restrictPercent(dsp.doubleDelay.delay1.level);
                dsp.doubleDelay.delay2.delay = DspConvert.restrictDelay1(dsp.doubleDelay.delay2.delay);
                dsp.doubleDelay.delay2.feedback = DspConvert.toFeedback(dsp.doubleDelay.delay2.feedback);
                dsp.doubleDelay.delay2.level = DspConvert.restrictPercent(dsp.doubleDelay.delay2.level);
                dsp.doubleDelay.delay3.delay = DspConvert.restrictDelay3(dsp.doubleDelay.delay3.delay);
                dsp.doubleDelay.delay3.feedback = DspConvert.toFeedback(dsp.doubleDelay.delay3.feedback);
                dsp.doubleDelay.delay3.level = DspConvert.restrictPercent(dsp.doubleDelay.delay3.level);
                dsp.doubleDelay.delay4.delay = DspConvert.toDelay4(dsp.doubleDelay.delay4.delay);
                dsp.doubleDelay.delay4.feedback = DspConvert.toFeedback(dsp.doubleDelay.delay4.feedback);
                dsp.doubleDelay.delay4.level = DspConvert.restrictPercent(dsp.doubleDelay.delay4.level);
                dsp.doubleDelay.frequency1 = DspConvert.toFrequency(dsp.doubleDelay.frequency1);
                dsp.doubleDelay.frequency2 = DspConvert.toFrequency(dsp.doubleDelay.frequency2);
                dsp.doubleDelay.frequencyL = DspConvert.toFrequency(dsp.doubleDelay.frequencyL);
                dsp.doubleDelay.frequencyR = DspConvert.toFrequency(dsp.doubleDelay.frequencyR);
                dsp.doubleDelay.outL = DspConvert.toBalance(dsp.doubleDelay.outL);
                dsp.doubleDelay.outR = DspConvert.toBalance(dsp.doubleDelay.outR);
            }
            break;
            case DspType.FourTapsDelay:
            if (dsp.fourTapsDelay) {
                dsp.fourTapsDelay.feedback = DspConvert.restrictPercent(dsp.fourTapsDelay.feedback);
                dsp.fourTapsDelay.frequency = DspConvert.toFrequency2(dsp.fourTapsDelay.frequency);
                dsp.fourTapsDelay.tap1 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap1);
                dsp.fourTapsDelay.tap2 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap2);
                dsp.fourTapsDelay.tap3 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap3);
                dsp.fourTapsDelay.tap4 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap4);
                dsp.fourTapsDelay.tempo = DspConvert.toTempo(dsp.fourTapsDelay.tempo);
            }
            break;
            case DspType.FreeVerb:
            if (dsp.freeVerb) {
                dsp.freeVerb.hiPassFrequency = DspConvert.toFrequency(dsp.freeVerb.hiPassFrequency);
                dsp.freeVerb.size = DspConvert.restrictSize2(dsp.freeVerb.size);
            }
            break;
            case DspType.Hall:
            if (dsp.hall) {
                dsp.hall.hiPassFrequency = DspConvert.toFrequency(dsp.hall.hiPassFrequency);
                dsp.hall.lowPassFrequency = DspConvert.toFrequency(dsp.hall.lowPassFrequency);
                dsp.hall.preDelayTime = DspConvert.restrictDelayTime(dsp.hall.preDelayTime);
                dsp.hall.reverbTime = DspConvert.restrictReverbTime(dsp.hall.reverbTime);
            }
            break;
            case DspType.Plate:
            if (dsp.plate) {
                dsp.plate.hiPassFrequency = DspConvert.toFrequency(dsp.plate.hiPassFrequency);
                dsp.plate.lowPassFrequency = DspConvert.toFrequency(dsp.plate.lowPassFrequency);
                dsp.plate.size = DspConvert.restrictSize(dsp.plate.size);
            }
            break;
            case DspType.SingleTap:
            if (dsp.singleTap) {
                dsp.singleTap.feedback = DspConvert.restrictPercent(dsp.singleTap.feedback);
                dsp.singleTap.frequency = DspConvert.toFrequency2(dsp.singleTap.frequency);
                dsp.singleTap.tempo = DspConvert.toTempo(dsp.singleTap.tempo);
            }
            break;
            case DspType.TripleDelay:
            if (dsp.tripleDelay) {
                dsp.tripleDelay.feedback = DspConvert.restrictPercent(dsp.tripleDelay.feedback);
                dsp.tripleDelay.frequency = DspConvert.toFrequency2(dsp.tripleDelay.frequency);
                dsp.tripleDelay.tap1 = DspConvert.restrictPercent(dsp.tripleDelay.tap1);
                dsp.tripleDelay.tap2 = DspConvert.restrictPercent(dsp.tripleDelay.tap2);
                dsp.tripleDelay.tap3 = DspConvert.restrictPercent(dsp.tripleDelay.tap3);
                dsp.tripleDelay.tempo = DspConvert.toTempo(dsp.tripleDelay.tempo);
            }
            break;
            default:
            break;
        }
    }

    private static dspFromLogical(dsp: Dsp) {
        dsp.input = Convert.fromPercent(dsp.input);
        dsp.dry = Convert.fromPercent(dsp.dry);
        dsp.wet = Convert.fromPercent(dsp.wet);

        switch (dsp.type) {
            case DspType.CaveDelay:
            if (dsp.caveDelay) {
                dsp.caveDelay.delay1.delay = DspConvert.restrictCaveDelay1(dsp.caveDelay.delay1.delay);
                dsp.caveDelay.delay1.feedback = DspConvert.fromFeedback(dsp.caveDelay.delay1.feedback);
                dsp.caveDelay.delay1.level = DspConvert.restrictPercent(dsp.caveDelay.delay1.level);
                dsp.caveDelay.delay2.delay = DspConvert.restrictCaveDelay2(dsp.caveDelay.delay2.delay);
                dsp.caveDelay.delay2.feedback = DspConvert.fromFeedback(dsp.caveDelay.delay2.feedback);
                dsp.caveDelay.delay2.level = DspConvert.restrictPercent(dsp.caveDelay.delay2.level);
                dsp.caveDelay.delay3.delay = DspConvert.restrictCaveDelay3(dsp.caveDelay.delay3.delay);
                dsp.caveDelay.delay3.feedback = DspConvert.fromFeedback(dsp.caveDelay.delay3.feedback);
                dsp.caveDelay.delay3.level = DspConvert.restrictPercent(dsp.caveDelay.delay3.level);
                dsp.caveDelay.delay4.delay = DspConvert.fromCaveDelay4(dsp.caveDelay.delay4.delay);
                dsp.caveDelay.delay4.feedback = DspConvert.fromFeedback(dsp.caveDelay.delay4.feedback);
                dsp.caveDelay.delay4.level = DspConvert.restrictPercent(dsp.caveDelay.delay4.level);
                dsp.caveDelay.frequency1 = DspConvert.fromFrequency(dsp.caveDelay.frequency1);
                dsp.caveDelay.frequency2 = DspConvert.fromFrequency(dsp.caveDelay.frequency2);
                dsp.caveDelay.frequencyL = DspConvert.fromFrequency(dsp.caveDelay.frequencyL);
                dsp.caveDelay.frequencyR = DspConvert.fromFrequency(dsp.caveDelay.frequencyR);
                dsp.caveDelay.outL = DspConvert.fromBalance(dsp.caveDelay.outL);
                dsp.caveDelay.outR = DspConvert.fromBalance(dsp.caveDelay.outR);
            }
            break;
            case DspType.CustomSpring:
            if (dsp.customSpring) {
                dsp.customSpring.hiPassFrequency = DspConvert.fromFrequency(dsp.customSpring.hiPassFrequency);
                dsp.customSpring.lowPassFrequency = DspConvert.fromFrequency(dsp.customSpring.lowPassFrequency);
                dsp.customSpring.time = DspConvert.restrictTime(dsp.customSpring.time);
            }
            break;
            case DspType.DoubleDelay:
            if (dsp.doubleDelay) {
                dsp.doubleDelay.delay1.delay = DspConvert.restrictDelay1(dsp.doubleDelay.delay1.delay);
                dsp.doubleDelay.delay1.feedback = DspConvert.fromFeedback(dsp.doubleDelay.delay1.feedback);
                dsp.doubleDelay.delay1.level = DspConvert.restrictPercent(dsp.doubleDelay.delay1.level);
                dsp.doubleDelay.delay2.delay = DspConvert.restrictDelay1(dsp.doubleDelay.delay2.delay);
                dsp.doubleDelay.delay2.feedback = DspConvert.fromFeedback(dsp.doubleDelay.delay2.feedback);
                dsp.doubleDelay.delay2.level = DspConvert.restrictPercent(dsp.doubleDelay.delay2.level);
                dsp.doubleDelay.delay3.delay = DspConvert.restrictDelay3(dsp.doubleDelay.delay3.delay);
                dsp.doubleDelay.delay3.feedback = DspConvert.fromFeedback(dsp.doubleDelay.delay3.feedback);
                dsp.doubleDelay.delay3.level = DspConvert.restrictPercent(dsp.doubleDelay.delay3.level);
                dsp.doubleDelay.delay4.delay = DspConvert.fromDelay4(dsp.doubleDelay.delay4.delay);
                dsp.doubleDelay.delay4.feedback = DspConvert.fromFeedback(dsp.doubleDelay.delay4.feedback);
                dsp.doubleDelay.delay4.level = DspConvert.restrictPercent(dsp.doubleDelay.delay4.level);
                dsp.doubleDelay.frequency1 = DspConvert.fromFrequency(dsp.doubleDelay.frequency1);
                dsp.doubleDelay.frequency2 = DspConvert.fromFrequency(dsp.doubleDelay.frequency2);
                dsp.doubleDelay.frequencyL = DspConvert.fromFrequency(dsp.doubleDelay.frequencyL);
                dsp.doubleDelay.frequencyR = DspConvert.fromFrequency(dsp.doubleDelay.frequencyR);
                dsp.doubleDelay.outL = DspConvert.fromBalance(dsp.doubleDelay.outL);
                dsp.doubleDelay.outR = DspConvert.fromBalance(dsp.doubleDelay.outR);
            }
            break;
            case DspType.FourTapsDelay:
            if (dsp.fourTapsDelay) {
                dsp.fourTapsDelay.feedback = DspConvert.restrictPercent(dsp.fourTapsDelay.feedback);
                dsp.fourTapsDelay.frequency = DspConvert.fromFrequency2(dsp.fourTapsDelay.frequency);
                dsp.fourTapsDelay.tap1 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap1);
                dsp.fourTapsDelay.tap2 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap2);
                dsp.fourTapsDelay.tap3 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap3);
                dsp.fourTapsDelay.tap4 = DspConvert.restrictPercent(dsp.fourTapsDelay.tap4);
                dsp.fourTapsDelay.tempo = DspConvert.fromTempo(dsp.fourTapsDelay.tempo);
            }
            break;
            case DspType.FreeVerb:
            if (dsp.freeVerb) {
                dsp.freeVerb.hiPassFrequency = DspConvert.fromFrequency(dsp.freeVerb.hiPassFrequency);
                dsp.freeVerb.size = DspConvert.restrictSize2(dsp.freeVerb.size);
            }
            break;
            case DspType.Hall:
            if (dsp.hall) {
                dsp.hall.hiPassFrequency = DspConvert.fromFrequency(dsp.hall.hiPassFrequency);
                dsp.hall.lowPassFrequency = DspConvert.fromFrequency(dsp.hall.lowPassFrequency);
                dsp.hall.preDelayTime = DspConvert.restrictDelayTime(dsp.hall.preDelayTime);
                dsp.hall.reverbTime = DspConvert.restrictReverbTime(dsp.hall.reverbTime);
            }
            break;
            case DspType.Plate:
            if (dsp.plate) {
                dsp.plate.hiPassFrequency = DspConvert.fromFrequency(dsp.plate.hiPassFrequency);
                dsp.plate.lowPassFrequency = DspConvert.fromFrequency(dsp.plate.lowPassFrequency);
                dsp.plate.size = DspConvert.restrictSize(dsp.plate.size);
            }
            break;
            case DspType.SingleTap:
            if (dsp.singleTap) {
                dsp.singleTap.feedback = DspConvert.restrictPercent(dsp.singleTap.feedback);
                dsp.singleTap.frequency = DspConvert.fromFrequency2(dsp.singleTap.frequency);
                dsp.singleTap.tempo = DspConvert.fromTempo(dsp.singleTap.tempo);
            }
            break;
            case DspType.TripleDelay:
            if (dsp.tripleDelay) {
                dsp.tripleDelay.feedback = DspConvert.restrictPercent(dsp.tripleDelay.feedback);
                dsp.tripleDelay.frequency = DspConvert.fromFrequency2(dsp.tripleDelay.frequency);
                dsp.tripleDelay.tap1 = DspConvert.restrictPercent(dsp.tripleDelay.tap1);
                dsp.tripleDelay.tap2 = DspConvert.restrictPercent(dsp.tripleDelay.tap2);
                dsp.tripleDelay.tap3 = DspConvert.restrictPercent(dsp.tripleDelay.tap3);
                dsp.tripleDelay.tempo = DspConvert.fromTempo(dsp.tripleDelay.tempo);
            }
            break;
            default:
            break;
        }
    }
}