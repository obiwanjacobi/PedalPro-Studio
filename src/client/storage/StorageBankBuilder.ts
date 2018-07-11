import { ArrayBuilder, ItemBuilder } from "../StateBuilder";
import { StorageBank } from "./StorageBank";

export class StorageBankBuilder extends ItemBuilder<StorageBank> {
    public static modify(preset: StorageBank, update: Partial<StorageBank>): StorageBank {
        return { ...preset, ...update };
    }
}

export class StorageBankArrayBuilder extends ArrayBuilder<StorageBank> {

    public remove(bank: string) {
        const removeBank = this.mutable.filter(b => b.name === bank);
        this.removeRange(removeBank);
    }
    
    public update(bank: StorageBank, update: Partial<StorageBank>): void {
        const index = this.mutable.findIndex(b => b.name === bank.name);
        this.mutable[index] = StorageBankBuilder.modify(bank, update);
    }

    public setLoaded(bankName: string) {
        const index = this.mutable.findIndex(b => b.name === bankName);
        this.mutable[index] = 
            StorageBankBuilder.modify(this.mutable[index], { loaded: true, created: true });
    }
}