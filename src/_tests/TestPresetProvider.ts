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
const preset4: Preset = {
    index: 4,
    name: "Preset 4"
};
const preset5: Preset = {
    index: 5,
    name: "Preset 5"
};
const preset6: Preset = {
    index: 6,
    name: "Preset 6"
};

const presets = [preset0, preset1, preset2, preset3, preset4, preset5, preset6];

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