import * as Path from "path";
import { numberToString } from "../../StringExtensions";

export class PresetFileName {
    public static readonly FileExtension = ".ppp";

    public readonly index: number;

    public static throwIfNotPresetFileExtension(filePath: string) {
        const ext = Path.extname(filePath);
        if (ext.toLowerCase() !== PresetFileName.FileExtension) {
            throw new Error(`File extension ${ext} is not a valid PedalPro Preset file extension.`);
        }
    }

    public static fromFilePath(filePath: string): PresetFileName {
        PresetFileName.throwIfNotPresetFileExtension(filePath);
        const parsed = Path.parse(filePath);
        return new PresetFileName(Number(parsed.name));
    }

    public constructor(index: number) {
        this.index = index;
    }

    public get name(): string {
        return numberToString(this.index, 3);
    }

    public get fileName(): string {
        return `${this.name}${PresetFileName.FileExtension}`;
    }

    public toFilePath(path: string): string {
        return Path.join(path, this.fileName);
    }
}