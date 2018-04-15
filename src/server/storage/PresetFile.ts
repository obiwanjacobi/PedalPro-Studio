import * as FileSystem from "fs";
import * as Path from "path";
import { Directory } from "./Directory";
import { Preset } from "../../model/Preset";

export class PresetFile {
    public static readonly FileExtension = ".ppp";

    private readonly filePath: FileSystem.PathLike;
    private dir: Directory;

    public static throwIfNotPresetFileExtension(filePath: string) {
        const ext = Path.extname(filePath);
        if (ext.toLowerCase() !== PresetFile.FileExtension) {
            throw new Error(`File extension ${ext} is not a valid PedalPro Preset file extension.`);
        }
    }

    public static create(filePath: string): PresetFile {
        PresetFile.throwIfNotPresetFileExtension(filePath);

        const file = new PresetFile(filePath);
        file.dir = Directory.create(Path.dirname(filePath));

        const fd = FileSystem.openSync(filePath, "w");
        FileSystem.closeSync(fd);
        
        return file;
    }

    public constructor(filePath: string) {
        PresetFile.throwIfNotPresetFileExtension(filePath);
        this.filePath = filePath;
    }

    public get directory(): Directory {
        if (!this.dir) {
            this.dir = new Directory(Path.dirname(this.filePath.toString()));
        }
        return this.dir;
    }

    public get name(): string {
        return Path.basename(this.filePath.toString());
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
}