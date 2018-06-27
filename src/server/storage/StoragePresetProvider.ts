import { PresetProvider } from "../PresetProvider";
import { Preset } from "../../model/Preset";
import { StorageManager } from "./StorageManager";

export class StoragePresetProvider implements PresetProvider {
    private readonly storageMgr: StorageManager;
    private readonly bank: string;
    private cache?: Preset[];

    public constructor(storageMgr: StorageManager, bank: string) {
        this.storageMgr = storageMgr;
        this.bank = bank;
    }

    public get presetCount(): number {
        return 0;
    }

    public getEmptyPreset(): Preset {
        throw new Error("Not Supported");
    }

    // @ts-ignore: optional ret val
    public getPreset(presetIndex: number): Preset {
        const presets = this.getPresets();
        if (presets.length < presetIndex) {
            return presets[presetIndex];
        }
        this.throwPresetIndexNotValid(presetIndex, presets.length);
    }

    public getPresets(): Preset[] {
        if (!this.cache) {
            this.cache = this.storageMgr.readPresets(this.bank);
        }
        return this.cache;
    }

    // @ts-ignore: optional ret val
    public getPresetsPaged(page: number, size: number): Preset[] {
        const start = page * size;
        const presets = this.getPresets();
        if (presets.length < start) {
            return this.getPresets().slice(start, start + size);
        }
        this.throwPresetIndexNotValid(start, presets.length);
    }

    public putPreset(preset: Preset): void {
        this.storageMgr.writePreset(this.bank, preset);
        this.cache = undefined;
    }

    public putPresets(presets: Preset[]): void {
        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];
            this.storageMgr.writePreset(this.bank, preset);
        }
        this.cache = undefined;
    }

    public deletePreset(presetIndex: number): Preset {
        const preset = this.getPresets()[presetIndex];
        this.storageMgr.deletePreset(this.bank, presetIndex);
        this.cache = undefined;
        return preset;
    }

    private throwPresetIndexNotValid(presetIndex: number, count: number) {
        throw new RangeError(`The Preset Index ${presetIndex} is not valid (0-${count - 1}).`);
    }
}