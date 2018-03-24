import { PresetSerializerEx } from "../extended/PresetSerializerEx";
import { PresetDeserializerEx } from "../extended/PresetDeserializerEx";
import { PresetBuffer } from "../PresetBuffer";
import { EffectsEx } from "../../model/Effects";
import { LogicalTransformerEx } from "../extended/LogicalTransformerEx";

const PresetBufferSize = 160;
const serializer = new PresetSerializerEx();
const deserializer = new PresetDeserializerEx();

const testPreset: number[] = [
    0x43, 0x6C, 0x65, 0x61, 0x6E, 0x4A, 0x61, 0x7A, 0x7A, 0x20,
    0xfe, 0x1f, 0x0, 0x18, 0x2, 0x3a, 0x0, 0x57, 0x74, 0x0, 0x80, 0x80, 0x4, 0xe, 0x1, 0xff, 0x0, 0x6, 
    0x9a, 0xb, 0x66, 0x0, 0x0, 0x6f, 0x0, 0x0, 0x1, 0x0, 0x65, 0x80, 0x80, 0x94, 0x5, 0x56, 0x22, 0x1e, 
    0x0, 0x92, 0x4, 0x94, 0x2, 0x0, 0x0, 0x92, 0x4, 0xf6, 0x1, 0x59, 0x0, 0x0, 0x1f, 0xff, 0xff, 0x11, 
    0x0, 0x66, 0x7f, 0x81, 0x7f, 0x0, 0x7f, 0x1, 0x0, 0x28, 0x2c, 0x24, 0x25, 0x2a, 0x29, 0x22, 0x1f, 
    0x0, 0xfc, 0x98, 0x0, 0x1, 0xa4, 0x1, 0xff, 0xff, 0xff, 0x1, 0x64, 0x0, 0xb3, 0xff, 0x82, 0x0, 0x0, 
    0xde, 0x8, 0xa6, 0xef, 0xcc, 0x99, 0x5c, 0x59, 0x0, 0x34, 0xe8, 0xe8, 0x5c, 0x5c, 0xff, 0xff, 0xf, 
    0xf, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x3, 0x0, 0x0, 0x28, 0x64, 0x2, 0x6c, 0x0, 0x0, 0x0, 
    0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 
    0x0, 0x0, 0x0, 0x0, 0x0, 0x0 
];

describe("Integration deserializer and logic transform", () => {

    it("compressor", () => {

        const buffer = new PresetBuffer(PresetBufferSize);
        buffer.write(0, testPreset, 0, PresetBufferSize);

        const preset = deserializer.deserialize(buffer);
        LogicalTransformerEx.presetToLogical(preset);

        expect(preset.name).toBe("CleanJazz");
        expect(preset.traits.empty).toBe(false);
        expect(preset.traits.expression).toBe(false);
        expect(preset.traits.humbucker).toBe(false);
        expect(preset.traits.singleCoil).toBe(false);
        expect(preset.traits.stereo).toBe(false);

        const effects = <EffectsEx> preset.effects;
        expect(effects.aux.mixDryLevelL).toBe(100);
        expect(effects.aux.mixDryLevelR).toBe(100);
        expect(effects.aux.mixGainSendL).toBe(90.9);
        expect(effects.aux.mixGainSendR).toBe(90.9);
        expect(effects.aux.mixWetLevelL).toBe(36);
        expect(effects.aux.mixWetLevelR).toBe(36);
        expect(effects.aux.routing).toBe(4);
        expect(effects.aux.switches.switch1).toBe(false);
        expect(effects.aux.switches.switch2).toBe(false);
        expect(effects.aux.switches.switch3).toBe(false);
        expect(effects.aux.switches.switch4).toBe(false);

        expect(effects.boost.enabled).toBe(false);
        expect(effects.boost.gain).toBe(6);

        expect(effects.compressor.attack).toBe(0);
        expect(effects.compressor.enabled).toBe(false);
        expect(effects.compressor.level).toBe(34.1);
        expect(effects.compressor.model).toBe(2);
        expect(effects.compressor.release).toBe(0);
        expect(effects.compressor.sensitivity).toBe(22.7);

        expect(effects.delay.feedback).toBe(80);
        expect(effects.delay.inputLevel).toBe(60);
        expect(effects.delay.modDepth).toBe(20.3);
        expect(effects.delay.modSpeed).toBe(0);
        expect(effects.delay.modulation).toBe(false);
        expect(effects.delay.outputLevel).toBe(36);
        expect(effects.delay.range).toBe(2);
        expect(effects.delay.routing).toBe(0);
        expect(effects.delay.time).toBe(579.6);
        expect(effects.delay.wet).toBe(34.9);

        expect(effects.dsp.dry).toBe(100);
        expect(effects.dsp.enabled).toBe(true);
        expect(effects.dsp.input).toBe(90.9);
        expect(effects.dsp.type).toBe(15);

        expect(effects.filters.autoHumanSync).toBe(false);
        expect(effects.filters.routing).toBe(0);

        expect(effects.filters.filter1.mode).toBe(0);
        expect(effects.filters.filter1.resonance).toBe(18);
        
        expect(effects.filters.filter1.auto.maxFrequency).toBe(1400);
        expect(effects.filters.filter1.auto.minFrequency).toBe(370);
        expect(effects.filters.filter1.auto.phase).toBe(0);
        expect(effects.filters.filter1.auto.tempo).toBe(120);
        expect(effects.filters.filter1.auto.wave).toBe(0);

        expect(effects.filters.filter1.envelope.function).toBe(0);
        expect(effects.filters.filter1.envelope.sensitivity).toBe(50.1);
        expect(effects.filters.filter1.envelope.startFrequency).toBe(371);

        expect(effects.filters.filter1.eq.enhancedFrequency).toBe(1001);
        expect(effects.filters.filter1.eq.resonance).toBe(18);

        expect(effects.filters.filter2.mode).toBe(0);
        expect(effects.filters.filter2.resonance).toBe(16);
        expect(effects.filters.filter2.type).toBe(0);

        expect(effects.filters.filter2.auto.maxFrequency).toBe(1399);
        expect(effects.filters.filter2.auto.minFrequency).toBe(371);
        expect(effects.filters.filter2.auto.phase).toBe(0);
        expect(effects.filters.filter2.auto.tempo).toBe(120);
        expect(effects.filters.filter2.auto.wave).toBe(0);

        expect(effects.filters.filter2.envelope.function).toBe(0);
        expect(effects.filters.filter2.envelope.sensitivity).toBe(50.1);
        expect(effects.filters.filter2.envelope.startFrequency).toBe(401);

        expect(effects.filters.filter2.eq.enhancedFrequency).toBe(1001);
        expect(effects.filters.filter2.eq.resonance).toBe(16);

        expect(effects.midi.routing.aux).toBe(0);
        expect(effects.midi.routing.delay).toBe(0);
        expect(effects.midi.routing.filter).toBe(0);
        expect(effects.midi.routing.modulation).toBe(0);

        expect(effects.modulation.mode).toBe(0);
        expect(effects.modulation.chorus.bright).toBe(false);
        expect(effects.modulation.chorus.depth).toBe(100);
        expect(effects.modulation.chorus.level).toBe(100);
        expect(effects.modulation.chorus.phase).toBe(0);
        expect(effects.modulation.chorus.tempo).toBe(45);
        expect(effects.modulation.chorus.wave).toBe(0);
        expect(effects.modulation.chorus.wet).toBe(100);

        expect(effects.modulation.vibe.boost).toBe(false);
        expect(effects.modulation.vibe.depth).toBe(65);
        expect(effects.modulation.vibe.phase).toBe(0);
        expect(effects.modulation.vibe.tempo).toBe(230);
        expect(effects.modulation.vibe.wave).toBe(0);

        expect(effects.modulation.flanger.delay).toBe(0);
        expect(effects.modulation.flanger.depth).toBe(70.1);
        expect(effects.modulation.flanger.feedback).toBe(50.9);
        expect(effects.modulation.flanger.harmonics).toBe(0);
        expect(effects.modulation.flanger.tempo).toBe(13);
        expect(effects.modulation.flanger.wave).toBe(0);
        expect(effects.modulation.flanger.wet).toBe(100);
        
        expect(effects.noiseGate.enabled).toBe(false);
        expect(effects.noiseGate.noiseLevel).toBe(45.4);
        expect(effects.noiseGate.release).toBe(0);
        expect(effects.noiseGate.sustain).toBe(false);
        
        expect(effects.phaser.depth).toBe(100);
        expect(effects.phaser.enabled).toBe(false);
        expect(effects.phaser.manual).toBe(0);
        expect(effects.phaser.phase).toBe(0);
        expect(effects.phaser.tempo).toBe(30);
        expect(effects.phaser.wave).toBe(1);
        
        expect(effects.pre.enabled).toBe(false);
        expect(effects.pre.routing).toBe(0);
        
        expect(effects.pre.distortionDiode.high).toBe(49.8);
        expect(effects.pre.distortionDiode.level).toBe(0);
        expect(effects.pre.distortionDiode.low).toBe(49.8);
        expect(effects.pre.distortionDiode.mid).toBe(50.5);
        expect(effects.pre.distortionDiode.type).toBe(0);

        expect(effects.pre.distortionFet.contour).toBe(49.8);
        expect(effects.pre.distortionFet.level).toBe(0.3);

        expect(effects.pre.emphasis.boost).toBe(false);
        expect(effects.pre.emphasis.frequency).toBe(1000);
        expect(effects.pre.emphasis.gain).toBe(-3);
        expect(effects.pre.emphasis.high).toBe(100);
        expect(effects.pre.emphasis.level).toBe(40);
        expect(effects.pre.emphasis.low).toBe(100);
        expect(effects.pre.emphasis.resonance).toBe(3);
        
        expect(effects.pre.equalizer.band1000Hz).toBe(2);
        expect(effects.pre.equalizer.band125Hz).toBe(2.4);
        expect(effects.pre.equalizer.band2000Hz).toBe(1.8);
        expect(effects.pre.equalizer.band250Hz).toBe(0.8);
        expect(effects.pre.equalizer.band4000Hz).toBe(0.4);
        expect(effects.pre.equalizer.band500Hz).toBe(1);
        expect(effects.pre.equalizer.band60Hz).toBe(1.6);
        expect(effects.pre.equalizer.band8000Hz).toBe(-0.2);

        expect(effects.pre.fuzz.boost).toBe(false);
        expect(effects.pre.fuzz.level).toBe(0);

        expect(effects.tap.mode).toBe(0);
        expect(effects.tap.tempoDivision).toBe(1);
        expect(effects.tap.tempoDivisionDelay).toBe(0);

        expect(effects.vca.assign).toBe(3);
        expect(effects.vca.depth).toBe(40);
        expect(effects.vca.enabled).toBe(false);
        expect(effects.vca.phase).toBe(0);
        expect(effects.vca.tempo).toBe(300);
        expect(effects.vca.wave).toBe(3);

        expect(effects.volume.enabled).toBe(false);
        expect(effects.volume.levelL).toBe(50.1);
        expect(effects.volume.levelR).toBe(50.1);

        LogicalTransformerEx.presetFromLogical(preset);

        serializer.serialize(buffer, preset);
        for (let i = 0; i < buffer.data.length; i++) {
            if (buffer.data[i] !== testPreset[i]) {
                // allow +/- 1 deviation
                expect(buffer.data[i] >= testPreset[i] - 1 &&
                    buffer.data[i] <= testPreset[i] + 1).toBe(true);
                    
                console.warn(`value ${buffer.data[i]} at index ${i} deviates from ${test[i]}`);
            }            
        }
    });
});

/*
{
    "presets": [
        {
            "data": "43,6C,65,61,6E,4A,61,7A,7A,20,FE,1F,0,18,2,3A,0,57,74,0,80,80,4,E,1,FF,0,6,9A,B,66,0,0,6F,0,0,1,0,
            65,80,80,94,5,56,22,1E,0,92,4,94,2,0,0,92,4,F6,1,59,0,0,1F,FF,FF,11,0,66,7F,81,7F,0,7F,1,0,28,2C,24,25,2A,
            29,22,1F,0,FC,98,0,1,A4,1,FF,FF,FF,1,64,0,B3,FF,82,0,0,DE,8,A6,EF,CC,99,5C,59,0,34,E8,E8,5C,5C,FF,FF,F,F,0,
            0,0,0,0,1,0,0,3,0,0,28,64,2,6C,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
            "name": "CleanJazz",
            "traits": {
                "singleCoil": false,
                "humbucker": false,
                "expression": false,
                "stereo": false,
                "empty": false
            },
            "effects": {
                "pre": {
                    "enabled": false,
                    "routing": 0,
                    "emphasis": {
                        "boost": false,
                        "frequency": 1000,
                        "gain": -3,
                        "high": 100,
                        "low": 100,
                        "level": 40,
                        "resonance": 3
                    },
                    "distortionDiode": {
                        "type": 0,
                        "high": 49.8,
                        "mid": 50.5,
                        "low": 49.8,
                        "level": 0
                    },
                    "distortionFet": {
                        "contour": 49.8,
                        "level": 0.3
                    },
                    "fuzz": {
                        "boost": false,
                        "level": 0
                    },
                    "equalizer": {
                        "band60Hz": 1.6,
                        "band125Hz": 2.4,
                        "band250Hz": 0.8,
                        "band500Hz": 1,
                        "band1000Hz": 2,
                        "band2000Hz": 1.8,
                        "band4000Hz": 0.4,
                        "band8000Hz": -0.2
                    }
                },
                "dsp": {
                    "enabled": true,
                    "type": 15,
                    "input": 90.9,
                    "dry": 100,
                    "wet": 36,
                    "data": "28,64,2,6C,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
                },
                "compressor": {
                    "attack": 0,
                    "enabled": false,
                    "level": 34.1,
                    "model": 2,
                    "release": 0,
                    "sensitivity": 22.7
                },
                "boost": {
                    "enabled": false,
                    "gain": 6
                },
                "vca": {
                    "assign": 3,
                    "depth": 40,
                    "enabled": false,
                    "phase": 0,
                    "tempo": 300,
                    "wave": 3
                },
                "noiseGate": {
                    "enabled": false,
                    "noiseLevel": 45.4,
                    "release": 0,
                    "sustain": false
                },
                "volume": {
                    "enabled": false,
                    "levelL": 50.1,
                    "levelR": 50.1
                },
                "phaser": {
                    "enabled": false,
                    "depth": 100,
                    "manual": 0,
                    "phase": 0,
                    "tempo": 30,
                    "wave": 1
                },
                "filters": {
                    "autoHumanSync": false,
                    "routing": 0,
                    "filter1": {
                        "resonance": 18,
                        "mode": 0,
                        "auto": {
                            "maxFrequency": 1400,
                            "minFrequency": 370,
                            "phase": 0,
                            "tempo": 120,
                            "wave": 0
                        },
                        "envelope": {
                            "function": 0,
                            "sensitivity": 50.1,
                            "startFrequency": 371
                        },
                        "eq": {
                            "resonance": 18,
                            "enhancedFrequency": 1001
                        }
                    },
                    "filter2": {
                        "resonance": 16,
                        "type": 0,
                        "mode": 0,
                        "auto": {
                            "maxFrequency": 1399,
                            "minFrequency": 371,
                            "phase": 0,
                            "tempo": 120,
                            "wave": 0
                        },
                        "envelope": {
                            "function": 0,
                            "sensitivity": 50.1,
                            "startFrequency": 401
                        },
                        "eq": {
                            "resonance": 16,
                            "enhancedFrequency": 1001
                        }
                    }
                },
                "modulation": {
                    "mode": 0,
                    "chorus": {
                        "bright": false,
                        "depth": 100,
                        "level": 100,
                        "phase": 0,
                        "tempo": 45,
                        "wave": 0,
                        "wet": 100
                    },
                    "vibe": {
                        "boost": false,
                        "depth": 65,
                        "phase": 0,
                        "tempo": 230,
                        "wave": 0
                    },
                    "flanger": {
                        "delay": 0,
                        "depth": 70.1,
                        "feedback": 50.9,
                        "harmonics": 0,
                        "tempo": 13,
                        "wave": 0,
                        "wet": 100
                    }
                },
                "delay": {
                    "feedback": 80,
                    "inputLevel": 60,
                    "outputLevel": 36,
                    "range": 2,
                    "routing": 0,
                    "time": 579.6,
                    "wet": 34.9,
                    "modulation": false,
                    "modDepth": 20.3,
                    "modSpeed": 0
                },
                "aux": {
                    "routing": 4,
                    "mixDryLevelL": 100,
                    "mixDryLevelR": 100,
                    "mixGainSendL": 90.9,
                    "mixGainSendR": 90.9,
                    "mixWetLevelL": 36,
                    "mixWetLevelR": 36,
                    "switches": {
                        "switch1": false,
                        "switch2": false,
                        "switch3": false,
                        "switch4": false
                    }
                },
                "midi": {
                    "routing": {
                        "aux": 0,
                        "delay": 0,
                        "filter": 0,
                        "modulation": 0
                    }
                },
                "tap": {
                    "mode": 0,
                    "tempoDivision": 1,
                    "tempoDivisionDelay": 0
                }
            },
            "index": "0"
        }
    ]
}
*/