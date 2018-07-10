import { PresetProvider } from "../PresetProvider";
import { Preset } from "../../model/Preset";
import { StorageManager } from "./StorageManager";
import { StorageBankManager } from "./StorageBankManager";

export class StoragePresetProvider implements PresetProvider {
    private readonly bankMgr: StorageBankManager;
    private cache?: Preset[];

    public constructor(storageMgr: StorageManager, bank: string) {
        this.bankMgr = new StorageBankManager(storageMgr, bank);
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
        this.throwPresetIndexNotValid(presetIndex, presets.length);
        return presets[presetIndex];
    }

    public getPresets(): Preset[] {
        if (!this.cache) {
            this.cache = this.bankMgr.readPresets();
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
        this.bankMgr.writePreset(preset);
        this.cache = undefined;
    }

    public putPresets(presets: Preset[]): void {
        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];
            this.bankMgr.writePreset(preset);
        }
        this.cache = undefined;
    }

    public deletePreset(presetIndex: number): Preset {
        const preset = this.getPresets()[presetIndex];
        this.bankMgr.deletePreset(presetIndex);
        this.cache = undefined;
        return preset;
    }

    private throwPresetIndexNotValid(presetIndex: number, count: number) {
        throw new RangeError(`The Preset Index ${presetIndex} is not valid (0-${count - 1}).`);
    }
}