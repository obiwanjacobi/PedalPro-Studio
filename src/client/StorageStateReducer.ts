import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { StorageBank } from "./StorageBank";
import { ItemUI, ItemUiModify } from "./ItemUI";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";
import { BankArrayBuilder, BankBuilder } from "./BankBuilder";
import { LoadBanksAction } from "./LoadBanksAction";
import { ChangeBanksAction } from "./ChangeBanksAction";
import { reduceFault } from "./FaultStateReducer";

const reduceChangeBanks = (state: ApplicationDocument, banks: StorageBank[], ui: Partial<ItemUI>): 
    ApplicationDocument => {

    if (banks.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    const bankBuilder = new BankArrayBuilder(builder.mutable.banks);
    bankBuilder.forRange(banks, (b: StorageBank, index: number) => {
        bankBuilder.mutable[index] = BankBuilder.modify(b, { ui: ItemUiModify(b.ui, ui) });
    });
    builder.mutable.banks = bankBuilder.detach();

    return builder.detach();
};

const reduceLoadBanks = (state: ApplicationDocument, banks: StorageBank[]): ApplicationDocument => {
    if (banks.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    const bankBuilder = new BankArrayBuilder(builder.mutable.banks);
    bankBuilder.addRange(banks);
    builder.mutable.banks = bankBuilder.detach();

    return builder.detach();
};

export type StorageAction = LoadBanksAction | ChangeBanksAction;

export const reduce = (state: ApplicationDocument, action: StorageAction): ApplicationDocument => {
    switch (action.type) {
        case "R/storage/*":
        if (action.error) {
            return reduceFault(state, PresetCollectionType.storage, action.error);
        }
        if (action.banks) {
            return reduceLoadBanks(state, action.banks);
        }
        break;
        case "U/storage/banks/ui":
        return reduceChangeBanks(state, action.banks, action.ui);

        default:
        break;
    }

    return state;
};