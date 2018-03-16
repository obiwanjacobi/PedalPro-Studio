import Preset from "../model/Preset";

export default class PresetProvider {
    getPreset(_: number): Preset {
        throw new Error("Not Supported.");
    }
    
    getPresets(): Preset[] {
        throw new Error("Not Supported.");
    }
    
    putPreset(_: Preset): void {
        throw new Error("Not Supported.");
    }
}