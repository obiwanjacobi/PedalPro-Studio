import { Directory } from "./Directory";
import { Bank } from "../../model/Bank";

export class StorageManager {
    private readonly dir: Directory;

    public constructor(path: string) {
        this.dir = Directory.create(path);
    }

    public listBanks(): Bank[] {
        return this.dir.directories();
    }
}