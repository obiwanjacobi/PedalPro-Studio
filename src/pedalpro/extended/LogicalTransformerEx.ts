import CommonLogicalTransformer from "../CommonLogicalTransformer";
import { EffectsEx } from "../../model/Effects";
import Preset from "../../model/Preset";
import PreAmp from "../../model/PreAmp";
import Dsp from "../../model/Dsp";
import Convert from "../Convert";

export default class LogicalTransformerEx {
    public static preset(preset: Preset) {
        LogicalTransformerEx.effects(<EffectsEx> preset.effects);
    }

    private static effects(effects: EffectsEx) {
        CommonLogicalTransformer.compressor(effects.compressor);
        CommonLogicalTransformer.boost(effects.boost);
        CommonLogicalTransformer.noiseGate(effects.noiseGate);
        CommonLogicalTransformer.vca(effects.vca);
        CommonLogicalTransformer.phaser(effects.phaser);
        CommonLogicalTransformer.filters(effects.filters);
        CommonLogicalTransformer.volume(effects.volume);
        CommonLogicalTransformer.modulation(effects.modulation);
        CommonLogicalTransformer.delay(effects.delay);
        CommonLogicalTransformer.aux(effects.aux);

        LogicalTransformerEx.preAmp(effects.pre);
        LogicalTransformerEx.dsp(effects.dsp);
    }

    private static preAmp(pre: PreAmp) {
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

    private static dsp(dsp: Dsp) {
        dsp.input = Convert.toPercent(dsp.input);
        dsp.dry = Convert.toPercent(dsp.dry);
        dsp.wet = Convert.toPercent(dsp.wet);
    }
}