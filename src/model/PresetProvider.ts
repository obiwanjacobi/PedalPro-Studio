import Preset from "./Preset";

export default interface PresetProvider {
    presetCount: number;
    getPreset(presetIndex: number): Promise<Preset>;
    getPresets(): Promise<Preset[]>;
}