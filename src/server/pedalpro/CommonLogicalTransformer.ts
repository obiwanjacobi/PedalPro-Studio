import { Compressor } from "../model/Compressor";
import { Boost } from "../model/Boost";
import { VoltageControlledAmp } from "../model/VoltageControlledAmp";
import { Phaser } from "../model/Phaser";
import { NoiseGate } from "../model/NoiseGate";
import { Filters } from "../model/Filters";
import { Modulation } from "../model/Modulation";
import { Delay, DelayRange } from "../model/Delay";
import { Aux } from "../model/SendReturn";
import { Volume } from "../model/Volume";
import { Convert } from "./Convert";

export class CommonLogicalTransformer {
    public static compressorToLogical(compressor: Compressor) {
        compressor.level = Convert.toPercent(compressor.level);
        compressor.sensitivity = Convert.toPercent(compressor.sensitivity);
    }

    public static compressorFromLogical(compressor: Compressor) {
        compressor.level = Convert.fromPercent(compressor.level);
        compressor.sensitivity = Convert.fromPercent(compressor.sensitivity);
    }

    public static boostToLogical(boost: Boost) {
        boost.gain = Convert.toDB(boost.gain);
    }

    public static boostFromLogical(boost: Boost) {
        boost.gain = Convert.fromDB(boost.gain);
    }

    public static phaserToLogical(phaser: Phaser) {
        phaser.manual = Convert.toPercent(phaser.manual);
        phaser.depth = Convert.toPercent(phaser.depth);
        phaser.tempo = Convert.toTempoSpeed(phaser.tempo);
    }

    public static phaserFromLogical(phaser: Phaser) {
        phaser.manual = Convert.fromPercent(phaser.manual);
        phaser.depth = Convert.fromPercent(phaser.depth);
        phaser.tempo = Convert.fromTempoSpeed(phaser.tempo);
    }

    public static noiseGateToLogical(noiseGate: NoiseGate) {
        noiseGate.noiseLevel = Convert.toPercent(noiseGate.noiseLevel);
        noiseGate.release = Convert.toPercent(noiseGate.release);
    }

    public static noiseGateFromLogical(noiseGate: NoiseGate) {
        noiseGate.noiseLevel = Convert.fromPercent(noiseGate.noiseLevel);
        noiseGate.release = Convert.fromPercent(noiseGate.release);
    }

    public static filtersToLogical(filters: Filters) {
        filters.filter1.resonance = Convert.toResonance1(filters.filter1.resonance);
        filters.filter1.auto.tempo = Convert.toTempoSpeed(filters.filter1.auto.tempo);
        filters.filter1.auto.minFrequency = Convert.toFrequency1(filters.filter1.auto.minFrequency);
        filters.filter1.auto.maxFrequency = Convert.toFrequency1(filters.filter1.auto.maxFrequency);
        filters.filter1.envelope.sensitivity = Convert.toPercent(filters.filter1.envelope.sensitivity);
        filters.filter1.envelope.startFrequency = Convert.toFrequency1(filters.filter1.envelope.startFrequency);
        filters.filter1.eq.enhancedFrequency  = Convert.toFrequency1(filters.filter1.eq.enhancedFrequency);
        filters.filter1.eq.resonance  = Convert.toResonance1(filters.filter1.eq.resonance);

        filters.filter2.resonance = Convert.toResonance2(filters.filter2.resonance);
        filters.filter2.auto.tempo = Convert.toTempoSpeed(filters.filter2.auto.tempo);
        filters.filter2.auto.minFrequency = Convert.toFrequency2(filters.filter2.auto.minFrequency);
        filters.filter2.auto.maxFrequency = Convert.toFrequency2(filters.filter2.auto.maxFrequency);
        filters.filter2.envelope.sensitivity = Convert.toPercent(filters.filter2.envelope.sensitivity);
        filters.filter2.envelope.startFrequency = Convert.toFrequency2(filters.filter2.envelope.startFrequency);
        filters.filter2.eq.enhancedFrequency  = Convert.toFrequency2(filters.filter2.eq.enhancedFrequency);
        filters.filter2.eq.resonance  = Convert.toResonance2(filters.filter2.eq.resonance);
    }

    public static filtersFromLogical(filters: Filters) {
        filters.filter1.resonance = Convert.fromResonance1(filters.filter1.resonance);
        filters.filter1.auto.tempo = Convert.fromTempoSpeed(filters.filter1.auto.tempo);
        filters.filter1.auto.minFrequency = Convert.fromFrequency1(filters.filter1.auto.minFrequency);
        filters.filter1.auto.maxFrequency = Convert.fromFrequency1(filters.filter1.auto.maxFrequency);
        filters.filter1.envelope.sensitivity = Convert.fromPercent(filters.filter1.envelope.sensitivity);
        filters.filter1.envelope.startFrequency = Convert.fromFrequency1(filters.filter1.envelope.startFrequency);
        filters.filter1.eq.enhancedFrequency  = Convert.fromFrequency1(filters.filter1.eq.enhancedFrequency);
        filters.filter1.eq.resonance  = Convert.fromResonance1(filters.filter1.eq.resonance);

        filters.filter2.resonance = Convert.fromResonance2(filters.filter2.resonance);
        filters.filter2.auto.tempo = Convert.fromTempoSpeed(filters.filter2.auto.tempo);
        filters.filter2.auto.minFrequency = Convert.fromFrequency2(filters.filter2.auto.minFrequency);
        filters.filter2.auto.maxFrequency = Convert.fromFrequency2(filters.filter2.auto.maxFrequency);
        filters.filter2.envelope.sensitivity = Convert.fromPercent(filters.filter2.envelope.sensitivity);
        filters.filter2.envelope.startFrequency = Convert.fromFrequency2(filters.filter2.envelope.startFrequency);
        filters.filter2.eq.enhancedFrequency  = Convert.fromFrequency2(filters.filter2.eq.enhancedFrequency);
        filters.filter2.eq.resonance  = Convert.fromResonance2(filters.filter2.eq.resonance);
    }

    public static modulationToLogical(modulation: Modulation) {
        modulation.chorus.depth = Convert.toPercent(modulation.chorus.depth);
        modulation.chorus.level = Convert.toPercent(modulation.chorus.level);
        modulation.chorus.tempo = Convert.toTempoSpeed(modulation.chorus.tempo);
        modulation.chorus.wet = Convert.toPercent(modulation.chorus.wet);

        modulation.vibe.depth = Convert.toPercent(modulation.vibe.depth);
        modulation.vibe.tempo = Convert.toTempoSpeed(modulation.vibe.tempo);

        modulation.flanger.feedback = Convert.toPercent(modulation.flanger.feedback);
        modulation.flanger.depth = Convert.toPercent(modulation.flanger.depth);
        modulation.flanger.delay = Convert.toPercent(modulation.flanger.delay);
        modulation.flanger.wet = Convert.toPercent(modulation.flanger.wet);
        modulation.flanger.tempo = Convert.toTempoSpeed(modulation.flanger.tempo);
    }

    public static modulationFromLogical(modulation: Modulation) {
        modulation.chorus.depth = Convert.fromPercent(modulation.chorus.depth);
        modulation.chorus.level = Convert.fromPercent(modulation.chorus.level);
        modulation.chorus.tempo = Convert.fromTempoSpeed(modulation.chorus.tempo);
        modulation.chorus.wet = Convert.fromPercent(modulation.chorus.wet);

        modulation.vibe.depth = Convert.fromPercent(modulation.vibe.depth);
        modulation.vibe.tempo = Convert.fromTempoSpeed(modulation.vibe.tempo);

        modulation.flanger.feedback = Convert.fromPercent(modulation.flanger.feedback);
        modulation.flanger.depth = Convert.fromPercent(modulation.flanger.depth);
        modulation.flanger.delay = Convert.fromPercent(modulation.flanger.delay);
        modulation.flanger.wet = Convert.fromPercent(modulation.flanger.wet);
        modulation.flanger.tempo = Convert.fromTempoSpeed(modulation.flanger.tempo);
    }

    public static delayToLogical(delay: Delay) {
        delay.feedback = Convert.toPercent(delay.feedback);
        delay.inputLevel = Convert.toPercent(delay.inputLevel);
        delay.modDepth = Convert.toPercent(delay.modDepth);
        delay.modSpeed = Convert.toPercent(delay.modSpeed);
        delay.outputLevel = Convert.toPercent(delay.outputLevel);
        delay.wet = Convert.toPercent(delay.wet);

        switch (delay.range) {
            default:
            case DelayRange.Short:
            delay.time = Convert.toTimeShort(delay.time);
            break;
            case DelayRange.Medium:
            delay.time = Convert.toTimeMedium(delay.time);
            break;
            case DelayRange.Long:
            delay.time = Convert.toTimeLong(delay.time);
            break;
        }
    }

    public static delayFromLogical(delay: Delay) {
        delay.feedback = Convert.fromPercent(delay.feedback);
        delay.inputLevel = Convert.fromPercent(delay.inputLevel);
        delay.modDepth = Convert.fromPercent(delay.modDepth);
        delay.modSpeed = Convert.fromPercent(delay.modSpeed);
        delay.outputLevel = Convert.fromPercent(delay.outputLevel);
        delay.wet = Convert.fromPercent(delay.wet);

        switch (delay.range) {
            default:
            case DelayRange.Short:
            delay.time = Convert.fromTimeShort(delay.time);
            break;
            case DelayRange.Medium:
            delay.time = Convert.fromTimeMedium(delay.time);
            break;
            case DelayRange.Long:
            delay.time = Convert.fromTimeLong(delay.time);
            break;
        }
    }

    public static auxToLogical(aux: Aux) {
        aux.mixDryLevelL = Convert.toPercent(aux.mixDryLevelL);
        aux.mixDryLevelR = Convert.toPercent(aux.mixDryLevelR);
        aux.mixGainSendL = Convert.toPercent(aux.mixGainSendL);
        aux.mixGainSendR = Convert.toPercent(aux.mixGainSendR);
        aux.mixWetLevelL = Convert.toPercent(aux.mixWetLevelL);
        aux.mixWetLevelR = Convert.toPercent(aux.mixWetLevelR);
    }

    public static auxFromLogical(aux: Aux) {
        aux.mixDryLevelL = Convert.fromPercent(aux.mixDryLevelL);
        aux.mixDryLevelR = Convert.fromPercent(aux.mixDryLevelR);
        aux.mixGainSendL = Convert.fromPercent(aux.mixGainSendL);
        aux.mixGainSendR = Convert.fromPercent(aux.mixGainSendR);
        aux.mixWetLevelL = Convert.fromPercent(aux.mixWetLevelL);
        aux.mixWetLevelR = Convert.fromPercent(aux.mixWetLevelR);
    }

    public static vcaToLogical(vca: VoltageControlledAmp) {
        vca.depth = Convert.toPercent(vca.depth);
        vca.tempo = Convert.toTempoSpeed(vca.tempo);
    }

    public static vcaFromLogical(vca: VoltageControlledAmp) {
        vca.depth = Convert.fromPercent(vca.depth);
        vca.tempo = Convert.fromTempoSpeed(vca.tempo);
    }

    public static volumeToLogical(volume: Volume) {
        volume.levelL = Convert.toPercent(volume.levelL);
        volume.levelR = Convert.toPercent(volume.levelR);
    }

    public static volumeFromLogical(volume: Volume) {
        volume.levelL = Convert.fromPercent(volume.levelL);
        volume.levelR = Convert.fromPercent(volume.levelR);
    }
}