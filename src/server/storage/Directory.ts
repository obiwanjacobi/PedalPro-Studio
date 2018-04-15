import * as FileSystem from "fs";
import * as Path from "path";
import * as mkdirp from "mkdirp";

import { Bank } from "../../model/Bank";

export class Directory implements Bank {
    private readonly path: FileSystem.PathLike;
    private readonly stats: FileSystem.Stats;

    public static create(path: string): Directory {
        mkdirp.sync(path);
        return new Directory(path);
    }

    public constructor(path: string) {
        this.path = path;
        this.stats = FileSystem.lstatSync(path);

        if (!this.stats.isDirectory) {
            throw new Error(`Path '${path}' is not a directory.`);
        }
    }

    public get name(): string {
        return Path.dirname(this.path.toString());
    }

    public directories(): Directory[] {
        const basePath = this.path.toString();
        const directories = new Array<Directory>();

        FileSystem.readdirSync(this.path)
            .map(name => {
                const path = Path.join(basePath, name);
                const stat = FileSystem.lstatSync(path);
                if (stat.isDirectory) {
                    directories.push(new Directory(path));
                }
            })
        ;

        return directories;
    }
}