import * as Path from "path";

import { Bank } from "../../model/Storage";
import { Directory } from "./Directory";
import { PresetFile } from "./PresetFile";
import { Preset } from "../../model/Preset";

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

    private getFiles(bank: string): PresetFile[] {
        const path = Path.join(this.dir.path, bank);
        const dir = new Directory(path);
        return dir.files();
    }

    // private getFile(file: FileInfo): PresetFile {
    //     const path = Path.join(this.dir.path, file.bank);
    //     const bank = new Directory(path);
    //     return bank.getFile(file.name);
    // }
}