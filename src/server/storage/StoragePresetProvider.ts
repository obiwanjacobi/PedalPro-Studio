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

    public getPreset(presetIndex: number): Preset {
        return this.getPresets()[presetIndex];
    }

    public getPresets(): Preset[] {
        if (!this.cache) {
            this.cache = this.storageMgr.readPresets(this.bank);
        }
        return this.cache;
    }

    public getPresetsPaged(page: number, size: number): Preset[] {
        const start = page * size;
        return this.getPresets().slice(start, start + size);
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
}