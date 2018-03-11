import Compressor from "../model/Compressor";
import Boost from "../model/Boost";
import VoltageControlledAmp from "../model/VoltageControlledAmp";
import Phaser from "../model/Phaser";
import NoiseGate from "../model/NoiseGate";
import Filters from "../model/Filters";
import Modulation from "../model/Modulation";
import Delay, { DelayRange } from "../model/Delay";
import Aux from "../model/SendReturn";
import Volume from "../model/Volume";
import Convert from "./Convert";

export default class CommonLogicalTransformer {
    public static compressor(compressor: Compressor) {
        compressor.level = Convert.toPercent(compressor.level);
        compressor.sensitivity = Convert.toPercent(compressor.sensitivity);
    }

    public static boost(boost: Boost) {
        boost.gain = Convert.toDB(boost.gain);
    }

    public static phaser(phaser: Phaser) {
        phaser.manual = Convert.toPercent(phaser.manual);
        phaser.depth = Convert.toPercent(phaser.depth);
        phaser.tempo = Convert.toTempoSpeed(phaser.tempo);
    }

    public static noiseGate(noiseGate: NoiseGate) {
        noiseGate.noiseLevel = Convert.toPercent(noiseGate.noiseLevel);
        noiseGate.release = Convert.toPercent(noiseGate.release);
    }

    public static filters(filters: Filters) {
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

    public static modulation(modulation: Modulation) {
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

    public static delay(delay: Delay) {
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

    public static aux(aux: Aux) {
        aux.mixDryLevelL = Convert.toPercent(aux.mixDryLevelL);
        aux.mixDryLevelR = Convert.toPercent(aux.mixDryLevelR);
        aux.mixGainSendL = Convert.toPercent(aux.mixGainSendL);
        aux.mixGainSendR = Convert.toPercent(aux.mixGainSendR);
        aux.mixWetLevelL = Convert.toPercent(aux.mixWetLevelL);
        aux.mixWetLevelR = Convert.toPercent(aux.mixWetLevelR);
    }

    public static vca(vca: VoltageControlledAmp) {
        vca.depth = Convert.toPercent(vca.depth);
        vca.tempo = Convert.toTempoSpeed(vca.tempo);
    }

    public static volume(volume: Volume) {
        volume.levelL = Convert.toPercent(volume.levelL);
        volume.levelR = Convert.toPercent(volume.levelR);
    }
}