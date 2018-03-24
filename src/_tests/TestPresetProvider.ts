import { Preset } from "../model/Preset";

const PresetCount: number = 400;

export class TestPresetProvider {
    private static presets: Preset[];

    public constructor() {
        if (!TestPresetProvider.presets) {
            TestPresetProvider.presets = new Array<Preset>(PresetCount);

            for (let index = 0; index < PresetCount; index++) {
                TestPresetProvider.presets[index] = {
                    index: index,
                    name: "Preset " + index,
                    expression: false,
                    stereo: false,
                    empty: false,
                };
            }
        }
    }

    public get presetCount(): number {
        return TestPresetProvider.presets.length;
    }

    public getPreset(presetIndex: number): Preset {
        return TestPresetProvider.presets[presetIndex];
    }
    
    public getPresets(): Preset[] {
        return TestPresetProvider.presets;
    }
}