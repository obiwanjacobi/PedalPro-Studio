import { Preset } from "../../model/Preset";
import { StorageManager } from "./StorageManager";

export class StorageBankManager {
    private readonly storageMgr: StorageManager;
    private readonly bank: string;

    public constructor(storageMgr: StorageManager, bank: string) {
        this.storageMgr = storageMgr;
        this.bank = bank;
    }

    public readPresets(): Preset[] {
        return this.storageMgr.readPresets(this.bank);
    }

    public writePreset(preset: Preset) {
        if (preset.traits.empty) {
            this.storageMgr.deletePreset(this.bank, preset.index);
        } else {
            this.storageMgr.writePreset(this.bank, preset);
        }
    }

    public deletePreset(presetIndex: number) {
        this.storageMgr.deletePreset(this.bank, presetIndex);
    }
}