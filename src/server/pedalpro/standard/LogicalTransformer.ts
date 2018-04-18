import { CommonLogicalTransformer } from "../CommonLogicalTransformer";
import { Effects } from "../../../model/Effects";
import { Preset } from "../../../model/Preset";
import { Convert } from "../Convert";
import { Distortion } from "../../../model/Distortion";

export class LogicalTransformer {
    public static presetToLogical(preset: Preset) {
        LogicalTransformer.effectsToLogical(<Effects> preset.effects);
    }

    public static presetFromLogical(preset: Preset) {
        LogicalTransformer.effectsFromLogical(<Effects> preset.effects);
    }
    
    private static effectsToLogical(effects: Effects) {
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

        LogicalTransformer.distortionToLogical(effects.distortion);
    }

    private static effectsFromLogical(effects: Effects) {
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

        LogicalTransformer.distortionFromLogical(effects.distortion);
    }

    private static distortionToLogical(dist: Distortion) {
        dist.level = Convert.toPercent(dist.level);
        dist.tone = Convert.toPercent(dist.tone);
    }

    private static distortionFromLogical(dist: Distortion) {
        dist.level = Convert.fromPercent(dist.level);
        dist.tone = Convert.fromPercent(dist.tone);
    }
}