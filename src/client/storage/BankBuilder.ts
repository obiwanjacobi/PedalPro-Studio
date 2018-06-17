import { ArrayBuilder, ItemBuilder } from "../StateBuilder";
import { StorageBank } from "./StorageBank";

export class BankBuilder extends ItemBuilder<StorageBank> {
    public static modify(preset: StorageBank, update: Partial<StorageBank>): StorageBank {
        return { ...preset, ...update };
    }
}

export class BankArrayBuilder extends ArrayBuilder<StorageBank> {
    public setLoaded(bankName: string) {
        const index = this.mutable.findIndex(b => b.name === bankName);
        this.mutable[index] = BankBuilder.modify(this.mutable[index], { loaded: true });
    }
}