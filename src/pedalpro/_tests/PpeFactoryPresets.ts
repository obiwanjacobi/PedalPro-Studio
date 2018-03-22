import Preset from "../../model/Preset";

const ZeroRaw: Preset = {
    name: "Zero",
    index: 0,
    traits: { 
        singleCoil: false,
        humbucker: false,
        expression: false,
        stereo: false,
    },
    effects: {
        compressor: {
            enabled: false,
            attack: 0,
            level: 0,
            model: 0,
            release: 0,
            sensitivity: 0
        },
        boost: {
            enabled: false,
            gain: 0,
        },
        pre: {
            enabled: false,
            routing: 0,
            emphasis: {
                boost: false,
                frequency: 0,
                gain: 0,
                high: 0,
                low: 0,
                level: 0,
                resonance: 0
            },
            distortionDiode: {
                type: 0,
                high: 0,
                mid: 0,
                low: 0,
                level: 0
            },
            distortionFet: {
                contour: 0,
                level: 0,
            },
            fuzz: {
                boost: 0,
                level: 0
            },
            equalizer: {
                band60Hz: 0,
                band125Hz: 0,
                band250Hz: 0,
                band500Hz: 0,
                band1000Hz: 0,
                band2000Hz: 0,
                band4000Hz: 0,
                band8000Hz: 0,
            }
        },
        noiseGate: {
            enabled: false,
            noiseLevel: 0,
            release: 0,
            sustain: false,
        },
        vca: {
            enabled: false,
            assign: 0,
            depth: 0,
            phase: 0,
            tempo: 0,
            wave: 0,
        },
        phaser: {
            enabled: false,
            depth: 0,
            manual: 0,
            phase: 0,
            tempo: 0,
            wave: 0
        },
        filters: {
            autoHumanSync: false,
            routing: 0,
            filter1: {
                mode: 0,
                resonance: 0,
                auto: {
                    minFrequency: 0,
                    maxFrequency: 0,
                    phase: 0,
                    tempo: 0,
                    wave: 0
                },
                envelope: {
                    function: 0,
                    sensitivity: 0,
                    startFrequency: 0
                },
                eq: {
                    resonance: 0,
                    enhancedFrequency: 0
                }
            },
            filter2: {
                type: 0,
                mode: 0,
                resonance: 0,
                auto: {
                    minFrequency: 0,
                    maxFrequency: 0,
                    phase: 0,
                    tempo: 0,
                    wave: 0
                },
                envelope: {
                    function: 0,
                    sensitivity: 0,
                    startFrequency: 0
                },
                eq: {
                    resonance: 0,
                    enhancedFrequency: 0
                }
            }
        },
        volume: {
            enabled: false,
            levelL: 0,
            levelR: 0
        },
        modulation: {
            mode: 0,
            chorus: {
                bright: false,
                depth: 0,
                level: 0,
                phase: 0,
                tempo: 0,
                wave: 0,
                wet: 0
            },
            vibe: {
                boost: false,
                depth: 0,
                phase: 0,
                tempo: 0,
                wave: 0,
            },
            flanger: {
                harmonics: 0,
                delay: 0,
                depth: 0,
                feedback: 0,
                tempo: 0,
                wave: 0,
                wet: 0
            }
        },
        delay: {
            routing: 0,
            range: 0,
            time: 0,
            inputLevel: 0,
            outputLevel: 0,
            wet: 0,
            modulation: false,
            modDepth: 0,
            modSpeed: 0
        },
        dsp: {
            enabled: false,
            type: 0,
            input: 0,
            dry: 0,
            wet: 0,
            data: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        },
        aux: {
            routing: 0,
            mixDryLevelL: 0,
            mixDryLevelR: 0,
            mixGainSendL: 0,
            mixGainSendR: 0,
            mixWetLevelL: 0,
            mixWetLevelR: 0
        }
    }
};