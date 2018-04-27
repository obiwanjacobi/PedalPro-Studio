import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";
import { ItemBuilder, CopyOption } from "./StateBuilder";

export class ApplicationDocumentBuilder extends ItemBuilder<ApplicationDocument> {
    public static default: ApplicationDocument = {
        banks: [],
        clipboard: [],
        device: [],
        factory: [],
        storage: [],
        notifications: [],
        screen: { pasteOpen: false },
    };

    public constructor(state: ApplicationDocument, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public transformPresets(
        collection: PresetCollectionType, 
        presetsFn: (originalPresets: Preset[]) => Preset[]) {
        const state = this.mutable;

        switch (collection) {
            case PresetCollectionType.clipboard:
            state.clipboard = presetsFn(state.clipboard);
            break;
            case PresetCollectionType.device:
            state.device = presetsFn(state.device);
            break;
            case PresetCollectionType.factory:
            state.factory = presetsFn(state.factory);
            break;
            case PresetCollectionType.storage:
            state.storage = presetsFn(state.storage);
            break;
                
            default:
            this.throwInvalidPresetCollection(collection);
        }
    }

    public setPresets(collection: PresetCollectionType, presets: Preset[]) {
        const state = this.mutable;

        switch (collection) {
            case PresetCollectionType.clipboard:
            state.clipboard = presets;
            break;
            case PresetCollectionType.device:
            state.device = presets;
            break;
            case PresetCollectionType.factory:
            state.factory = presets;
            break;
            case PresetCollectionType.storage:
            state.storage = presets;
            break;

            default:
            this.throwInvalidPresetCollection(collection);
        }
    }

    private throwInvalidPresetCollection(collection: string): void {
        throw new Error("Invalid Preset Collection Type: " + collection);
    }
}