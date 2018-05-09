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
        const dir = this.getBankDirectory(bank);
        return dir.files();
    }

    private getPresetFile(bank: string, index: number) {
        const dir = this.getBankDirectory(bank);
        const fileName = new PresetFileName(index);
        return new PresetFile(fileName.toFilePath(dir.path));
    }

    private getBankDirectory(bank: string): Directory {
        const path = Path.join(this.dir.path, bank);
        return new Directory(path);
    }

    // private getFile(file: FileInfo): PresetFile {
    //     const path = Path.join(this.dir.path, file.bank);
    //     const bank = new Directory(path);
    //     return bank.getFile(file.name);
    // }
}