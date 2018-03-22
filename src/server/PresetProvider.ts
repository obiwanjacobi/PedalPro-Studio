import Preset from "../model/Preset";

export interface DeviceProfile {
    presetCount: number;
    presetBufferSize: number;
}

export default class PresetProvider {
    protected readonly profile: DeviceProfile;

    public constructor(profile: DeviceProfile) {
        this.profile = profile;
    }

    public throwIfNotValidPresetIndex(presetIndex: number) {
        if (!this.isValidPresetIndex(presetIndex)) {
            throw new RangeError(`The Preset index is not valid (0-${this.profile.presetCount - 1}).`);
        }
    }

    public isValidPresetIndex(presetIndex: number): boolean {
        return presetIndex >= 0 && presetIndex < this.profile.presetCount;
    }

    public get presetCount(): number {
        return this.profile.presetCount;
    }

    public getPreset(_: number): Preset {
        throw new Error("Not Supported.");
    }
    
    public getPresets(): Preset[] {
        throw new Error("Not Supported.");
    }
    
    public putPreset(_: Preset): void {
        throw new Error("Not Supported.");
    }
}