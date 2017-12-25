import Preset from "../model/Preset";
import EntityFilter from "../model/EntityFilter";

const preset0: Preset = {
    index: 0,
    name: "Preset 0"
};
const preset1: Preset = {
    index: 1,
    name: "Preset 1"
};
const preset2: Preset = {
    index: 2,
    name: "Preset 2"
};
const preset3: Preset = {
    index: 3,
    name: "Preset 3"
};

const presets = [preset0, preset1, preset2, preset3];

export default class TestPresetProvider {
    public get presetCount(): number {
        return presets.length;
    }

    public getPreset(presetIndex: number): Promise<Preset> {
        return new Promise((resolve) => { resolve(presets[presetIndex]); });
    }
    
    public getPresets(filter: EntityFilter): Promise<Preset[]> {
        return new Promise((resolve) => { resolve(presets); });
    }
}