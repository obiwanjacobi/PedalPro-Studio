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
        throw new Error("Not Suppoered");
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
        throw new Error("Not Suppoered");
    }

    public putPreset(preset: Preset): void {
        throw new Error("Not Suppoered");
    }

    public putPresets(presets: Preset[]): void {
        throw new Error("Not Suppoered");
    }

    public deletePreset(presetIndex: number): Preset {
        throw new Error("Not Suppoered");
    }
}