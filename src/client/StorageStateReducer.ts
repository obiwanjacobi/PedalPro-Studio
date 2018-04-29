import { ApplicationDocument } from "./ApplicationDocument";
import { StorageBank } from "./StorageBank";
import { ItemUI, ItemUiModify } from "./ItemUI";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";
import { BankArrayBuilder, BankBuilder } from "./BankBuilder";

export const reduceChangeBanks = (
    state: ApplicationDocument, 
    banks: StorageBank[], 
    ui: Partial<ItemUI>): ApplicationDocument => {
    if (banks.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    const bankBuilder = new BankArrayBuilder(builder.mutable.banks);
    bankBuilder.forRange(banks, (b: StorageBank, index: number) => {
        bankBuilder.mutable[index] = BankBuilder.modify(b, { ui: ItemUiModify(b.ui, ui) });
    });
    builder.mutable.banks = bankBuilder.detach();

    return builder.detach();
};
