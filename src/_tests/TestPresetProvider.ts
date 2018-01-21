import Preset from "../model/Preset";

const PresetCount: number = 10;

export default class TestPresetProvider {
    private static presets: Preset[];

    public constructor() {
        if (!TestPresetProvider.presets) {
            TestPresetProvider.presets = new Array<Preset>(PresetCount);

            for (let index = 0; index < PresetCount; index++) {
                TestPresetProvider.presets[index] = {
                    index: index,
                    name: "Preset " + index
                };
            }
        }
    }

    public get presetCount(): number {
        return TestPresetProvider.presets.length;
    }

    public getPreset(presetIndex: number): Promise<Preset> {
        return new Promise((resolve) => { resolve(TestPresetProvider.presets[presetIndex]); });
    }
    
    public getPresets(): Promise<Preset[]> {
        return new Promise((resolve) => { resolve(TestPresetProvider.presets); });
    }
}