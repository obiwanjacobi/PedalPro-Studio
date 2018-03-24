import { CommonLogicalTransformer } from "../CommonLogicalTransformer";
import { EffectsEx } from "../../model/Effects";
import { Preset } from "../../model/Preset";
import { PreAmp } from "../../model/PreAmp";
import { Dsp } from "../../model/Dsp";
import { Convert } from "../Convert";

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
    }

    private static dspFromLogical(dsp: Dsp) {
        dsp.input = Convert.fromPercent(dsp.input);
        dsp.dry = Convert.fromPercent(dsp.dry);
        dsp.wet = Convert.fromPercent(dsp.wet);
    }
}