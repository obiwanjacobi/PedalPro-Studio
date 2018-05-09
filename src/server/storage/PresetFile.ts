import * as FileSystem from "fs";
import * as Path from "path";
import { Directory } from "./Directory";
import { Preset } from "../../model/Preset";
import { PresetFileName } from "./PresetFileName";

export class PresetFile {
    private readonly filePath: string;
    private dir: Directory;

    public static create(filePath: string): PresetFile {
        PresetFileName.throwIfNotPresetFileExtension(filePath);

        const file = new PresetFile(filePath);
        file.dir = Directory.create(Path.dirname(filePath));

        const fd = FileSystem.openSync(filePath, "w");
        FileSystem.closeSync(fd);
        
        return file;
    }

    public constructor(filePath: string) {
        PresetFileName.throwIfNotPresetFileExtension(filePath);
        this.filePath = filePath;
    }

    public get directory(): Directory {
        if (!this.dir) {
            this.dir = new Directory(Path.dirname(this.filePath));
        }
        return this.dir;
    }

    public get name(): string {
        return Path.basename(this.filePath);
    }

    public read(): Preset | null {
        const buffer = FileSystem.readFileSync(this.filePath);
        if (buffer.length > 0) {
            return JSON.parse(buffer.toString());
        }
        return null;
    }

    public write(preset: Preset) {
        const presetJson = JSON.stringify(preset);
        FileSystem.writeFileSync(this.filePath, presetJson);
    }

    public delete() {
        FileSystem.unlinkSync(this.filePath);
    }
}