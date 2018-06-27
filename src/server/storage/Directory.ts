import * as FileSystem from "fs";
import * as Path from "path";
import * as mkdirp from "mkdirp";

import { PresetFile } from "./PresetFile";
import { PresetFileName } from "./PresetFileName";

export class Directory {
    public readonly path: string;
    private readonly stats: FileSystem.Stats;

    public static create(path: string): Directory {
        mkdirp.sync(path);
        return new Directory(path);
    }

    public static exists(path: string): boolean {
        return FileSystem.existsSync(path);
    }

    public constructor(path: string) {
        this.path = path;
        this.stats = FileSystem.lstatSync(path);

        if (!this.stats.isDirectory) {
            throw new Error(`Path '${path}' is not a directory.`);
        }
    }

    public get name(): string {
        return Path.basename(this.path);
    }

    public directories(): Directory[] {
        const directories = new Array<Directory>();
        const dirPath = this.path;

        FileSystem.readdirSync(dirPath)
            .forEach(name => {
                const path = Path.join(dirPath, name);
                const stat = FileSystem.lstatSync(path);
                if (stat.isDirectory) {
                    directories.push(new Directory(path));
                }
            });

        return directories;
    }

    public files(): PresetFile[] {
        const files = new Array<PresetFile>();
        const dirPath = this.path;

        FileSystem.readdirSync(dirPath)
            .forEach(name => {
                if (Path.extname(name) === PresetFileName.FileExtension) {
                    const path = Path.join(dirPath, name);
                    const stat = FileSystem.lstatSync(path);
                    if (stat.isFile) {
                        files.push(new PresetFile(path));
                    }
                }
            });

        return files;
    }

    public delete(): void {
        FileSystem.rmdirSync(this.path);
    }
}