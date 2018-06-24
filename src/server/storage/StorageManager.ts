import * as Path from "path";

import { Bank } from "../../model/Storage";
import { Directory } from "./Directory";
import { PresetFile } from "./PresetFile";
import { Preset } from "../../model/Preset";
import { PresetFileName } from "./PresetFileName";

export class StorageManager {
    private readonly dir: Directory;

    public constructor(path: string) {
        this.dir = Directory.create(path);
    }

    public listBanks(): Bank[] {
        return this.dir.directories().map(d => { 
            return { 
                name: d.name, 
                files: d.files().map(f => f.name)
            };
        });
    }

    public findDirectory(bank: string): Directory | undefined {
        return this.dir.directories().find(d => d.name === bank);
    }

    public readPresets(bank: string): Preset[] {
        const presetsOrNull = this.getFiles(bank).map(f => f.read());
        const presets = new Array<Preset>();

        presetsOrNull.forEach(p => {
            if (p) {
                presets.push(p);
            }
        });

        return presets;
    }

    public writePreset(bank: string, preset: Preset) {
        const file = this.getPresetFile(bank, preset.index);
        file.write(preset);
    }

    public deletePreset(bank: string, presetIndex: number) {
        const file = this.getPresetFile(bank, presetIndex);
        file.delete();
    }

    private getFiles(bank: string): PresetFile[] {
        const dir = this.findBankDirectory(bank);
        if (dir) {
            return dir.files();
        }
        return new Array<PresetFile>();
    }

    private getPresetFile(bank: string, index: number) {
        let dir = this.getBankDirectory(bank);
        const fileName = new PresetFileName(index);
        return new PresetFile(fileName.toFilePath(dir.path));
    }

    private findBankDirectory(bank: string): Directory | undefined {
        const path = Path.join(this.dir.path, bank);
        if (Directory.exists(path)) {
            return new Directory(path);
        }
        return undefined;
    }

    private getBankDirectory(bank: string): Directory {
        const path = Path.join(this.dir.path, bank);
        return Directory.create(path);
    }
}