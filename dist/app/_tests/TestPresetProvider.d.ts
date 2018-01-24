import Preset from "../model/Preset";
export default class TestPresetProvider {
    private static presets;
    constructor();
    readonly presetCount: number;
    getPreset(presetIndex: number): Promise<Preset>;
    getPresets(): Promise<Preset[]>;
}
