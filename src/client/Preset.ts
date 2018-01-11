import { PresetCollectionType } from "./ApplicationDocument";
import * as ModelPreset from "../model/Preset";

// ui extensions
export default interface Preset extends ModelPreset.default {
    
    /**
     * source of the preset (local/device/storage/factory)
     */
    source: PresetCollectionType;

    /**
     * the source this preset was copied from.
     */
    copiedFrom: PresetCollectionType;

    /**
     * the index of this preset before it was copied.
     */
    previousIndex: number;

    /**
     * true when the preset is selected in the ui.
     */
    selected: boolean;
}