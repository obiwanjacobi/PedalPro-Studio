import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import * as ModelPreset from "../../model/Preset";
import { Preset } from "../preset/Preset";
import { PresetArrayBuilder, PresetBuilder } from "../preset/PresetBuilder";
import { presetsExceptIndexAreEqual } from "../preset/PresetOperations";
import { StorageBank } from "./StorageBank";
import { ItemUI, itemUiModify } from "../ItemUI";
import { LoadStorageBanksAction } from "./LoadStorageBanksAction";
import { ChangeStorageBanksAction } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";
import { AddStorageBankAction } from "./AddStorageBankAction";
import { StorageBankArrayBuilder, StorageBankBuilder } from "./StorageBankBuilder";
import { RenameStorageBankAction } from "./RenameStorageBankAction";
import { PasteStoragePresetsAction } from "./PasteStoragePresetsAction";
import { SaveStoragePresetsAction } from "./SaveStoragePresetsAction";
import { DeleteStoragePresetsAction } from "./DeleteStoragePresetsAction";
import { distinct } from "../../ArrayExtensions";
import { storagePresetsForBank } from "./BankOperations";

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
    const banksToRemove = bankBuilder.mutable.filter(b => b.created);
    bankBuilder.removeRange(banksToRemove);
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
    const bankNames = distinct(
        presets.map(p => p.group ? p.group.name : "")
        .filter(n => n.length)
    );

    const builder = new ApplicationDocumentBuilder(state);
    const presetsBuilder = new PresetArrayBuilder(builder.mutable.storage);
    bankNames.forEach(b => presetsBuilder.removeByGroup(b));
    presetsBuilder.addRange(presets);
    builder.mutable.storage = presetsBuilder.detach();

    const bankBuilder = new StorageBankArrayBuilder(builder.mutable.banks);
    bankNames.forEach(b => bankBuilder.setLoaded(b));
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
    
    const bankPresets = storagePresetsForBank(state.storage, bank.name);

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

const reducePasteStoragePresets = 
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

const ToBeDeletedPreset /*: ModelPreset.Preset*/ = {
    name: "{to_be_deleted}",
    meta: { device: "STORAGE" },
    traits : {
        empty: true,
        expression: false,
        humbucker: false,
        singleCoil: false,
        stereo: false
    }
};

const reduceDeleteStoragePresets =
    (state: ApplicationDocument, deleted: Preset[]): ApplicationDocument => {
    
        const builder = new ApplicationDocumentBuilder(state);
        builder.transformPresets(PresetCollectionType.storage, (originalPresets: Preset[]): Preset[] => {
            const deleteBuilder = new PresetArrayBuilder(deleted);
            deleteBuilder.forEach((p: Preset, index: number) => {
                deleteBuilder.mutable[index] = PresetBuilder.delete(p, <ModelPreset.Preset> ToBeDeletedPreset);
            });
    
            const presetBuilder = new PresetArrayBuilder(originalPresets);
            presetBuilder.replaceByPresetIndex(deleteBuilder.detach());
            return presetBuilder.detach();
        });
    
        return builder.detach();
    
};

export type StorageAction = 
    AddStorageBankAction | LoadStorageBanksAction | LoadStorageBankPresetsAction | 
    ChangeStorageBanksAction | RenameStorageBankAction | PasteStoragePresetsAction |
    SaveStoragePresetsAction | DeleteStoragePresetsAction;

export const reduce = (state: ApplicationDocument, action: StorageAction): ApplicationDocument => {
    switch (action.type) {
        case "R/storage/*":
        return reduceLoadStorageBanks(state, action.banks);

        case "R/storage/*/presets/":
        return reduceLoadBankStoragePresets(state, action.presets);

        case "U/storage/*/presets/":
        return reduceLoadBankStoragePresets(state, action.presets);

        case "C/storage/*":
        return reduceAddStorageBank(state);

        case "U/storage/[].name/presets/*.name":
        return reduceRenameStorageBank(state, action.bank, action.newName);

        case "U/storage/*/ui":
        return reduceChangeStorageBanks(state, action.banks, action.ui);

        case "C/storage/*/presets/":
        return reducePasteStoragePresets(state, action.presets, action.deleteAfterPaste);

        case "D/storage/*/presets/":
        return reduceDeleteStoragePresets(state, action.presets);

        default:
        break;
    }

    return state;
};
