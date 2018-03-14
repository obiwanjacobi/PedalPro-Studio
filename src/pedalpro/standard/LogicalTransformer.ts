import CommonLogicalTransformer from "../CommonLogicalTransformer";
import { Effects } from "../../model/Effects";
import Preset from "../../model/Preset";
import Convert from "../Convert";
import Distortion from "../../model/Distortion";

export default class LogicalTransformer {
    public static preset(preset: Preset) {
        LogicalTransformer.effects(<Effects> preset.effects);
    }

    private static effects(effects: Effects) {
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

        LogicalTransformer.distortion(effects.distortion);
    }

    private static distortion(dist: Distortion) {
        dist.level = Convert.toPercent(dist.level);
        dist.tone = Convert.toPercent(dist.tone);
    }

}