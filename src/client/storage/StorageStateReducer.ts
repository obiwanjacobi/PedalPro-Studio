import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import { Preset } from "../preset/Preset";
import { PresetArrayBuilder, PresetBuilder } from "../preset/PresetBuilder";
import { presetsExceptIndexAreEqual } from "../preset/PresetOperations";
import { StorageBank } from "./StorageBank";
import { ItemUI, itemUiModify } from "../ItemUI";
import { reduceFault } from "../FaultStateReducer";
import { LoadStorageBanksAction } from "./LoadStorageBanksAction";
import { ChangeStorageBanksAction } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";
import { AddStorageBankAction } from "./AddStorageBankAction";
import { StorageBankArrayBuilder, StorageBankBuilder } from "./StorageBankBuilder";
import { RenameStorageBankAction } from "./RenameStorageBankAction";

const reduceChangeStorageBanks = (state: ApplicationDocument, banks: StorageBank[], ui: Partial<ItemUI>): 
    ApplicationDocument => {

    if (banks.length === 0) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    const bankBuilder = new StorageBankArrayBuilder(builder.mutable.banks);
    bankBuilder.forRange(banks, (b: StorageBank, index: number) => {
        bankBuilder.mutable[index] = StorageBankBuilder.modify(b, { ui: itemUiModify(b.ui, ui) });
    });
    builder.mutable.banks = bankBuilder.detach();

    return builder.detach();
};

const reduceLoadStorageBanks = (state: ApplicationDocument, banks: StorageBank[]): ApplicationDocument => {
    if (banks.length === 0) { return state; }
    
    const builder = new ApplicationDocumentBuilder(state);
    const bankBuilder = new StorageBankArrayBuilder(builder.mutable.banks);
    
    bankBuilder.removeRange(banks, (b1, b2) => b1.name === b2.name);
    bankBuilder.addRange(banks);
    // remove storage presets for loaded banks
    const presetBuilder = new PresetArrayBuilder(builder.mutable.storage);
    const localPresets = builder.mutable.storage.filter(p => 
        // @ts-ignore: check is not detected
        p.group && banks.some(b => b.name === p.group.name));
    presetBuilder.removeRange(localPresets);

    builder.mutable.storage = presetBuilder.detach();
    builder.mutable.banks = bankBuilder.detach();
    return builder.detach();
};

const reduceLoadBankStoragePresets = (state: ApplicationDocument, presets: Preset[]): ApplicationDocument => {
    if (presets.length === 0) { return state; }
    if (presets.findIndex(p => !p.group) !== -1) { return state; }
    const bankNames = presets.map(p => p.group ? p.group.name : "");
    if (bankNames.findIndex(b => b === "") !== -1) { return state; }

    const builder = new ApplicationDocumentBuilder(state);
    const presetsBuilder = new PresetArrayBuilder(builder.mutable.storage);
    presetsBuilder.addRange(presets);
    builder.mutable.storage = presetsBuilder.detach();

    const bankBuilder = new StorageBankArrayBuilder(builder.mutable.banks);
    bankBuilder.setLoaded(bankNames[0]);
    builder.mutable.banks = bankBuilder.detach();

    return builder.detach();
};

const reduceAddStorageBank = (state: ApplicationDocument): ApplicationDocument => {
    const builder = new ApplicationDocumentBuilder(state);
    const bankBuilder = new StorageBankArrayBuilder(builder.mutable.banks);
    bankBuilder.add({ 
        name: "new", 
        loaded: false, 
        created: false,
        origin: { name: "", files: [] },
        ui: { 
            selected: false, 
            expanded: true, 
            markedDeleted: false
        }
    });
    builder.mutable.banks = bankBuilder.detach();
    return builder.detach();
};

const reduceRenameStorageBank = (state: ApplicationDocument, bank: StorageBank, name: string): ApplicationDocument => {
    if (!name || name.length === 0) { return state; }
    
    const bankPresets = state.storage.filter(p => p.group && p.group.name === bank.name);

    const builder = new ApplicationDocumentBuilder(state);
    // rename bank itself
    const bankBuilder = new StorageBankArrayBuilder(builder.mutable.banks);
    bankBuilder.update(bank, {name: name});
    builder.mutable.banks = bankBuilder.detach();
    // rename group name of all presets
    const presetBuilder = new PresetArrayBuilder(builder.mutable.storage);
    presetBuilder.forRange(
        bankPresets, 
        (p: Preset, i: number) => {
            presetBuilder.mutable[i] = PresetBuilder.modify(p, { 
                group: {
                    name: name, originName: p.group ? p.group.name : name
                }
            });
        }
    );
    builder.mutable.storage = presetBuilder.detach();
    return builder.detach();
};

export type StorageAction = 
    AddStorageBankAction | LoadStorageBanksAction | LoadStorageBankPresetsAction | 
    ChangeStorageBanksAction | RenameStorageBankAction;

export const reduce = (state: ApplicationDocument, action: StorageAction): ApplicationDocument => {
    switch (action.type) {
        case "R/storage/*":
        if (action.error) {
            return reduceFault(state, PresetCollectionType.storage, action.error);
        }
        if (action.banks) {
            return reduceLoadStorageBanks(state, action.banks);
        }
        break;
        
        case "R/storage/*/presets/":
        if (action.error) {
            return reduceFault(state, PresetCollectionType.storage, action.error);
        }
        if (action.presets) {
            return reduceLoadBankStoragePresets(state, action.presets);
        }
        break;

        case "C/storage/*":
        return reduceAddStorageBank(state);

        case "U/storage/[].name/presets/*.name":
        return reduceRenameStorageBank(state, action.bank, action.newName);

        case "U/storage/*/ui":
        return reduceChangeStorageBanks(state, action.banks, action.ui);

        default:
        break;
    }

    return state;
};

export const reducePasteStoragePresets = 
    (state: ApplicationDocument, presets: Preset[], deleteAfterPaste: boolean): ApplicationDocument => {

    if (presets.length === 0) { return state; }

    var builder = new ApplicationDocumentBuilder(state);
    var storageBuilder = new PresetArrayBuilder(builder.mutable.storage);

    storageBuilder.addRange(presets, p => {
        return PresetBuilder.modify(p, {source: PresetCollectionType.storage});
    });
    builder.mutable.storage = storageBuilder.detach();

    if (deleteAfterPaste) {
        builder.transformPresets(PresetCollectionType.clipboard, (clipboardPresets: Preset[]): Preset[] => {
            const presetBuilder = new PresetArrayBuilder(clipboardPresets);
            presetBuilder.removeRange(presets, presetsExceptIndexAreEqual);
            return presetBuilder.detach();
        });
    }
    return builder.detach();
};