import { PresetCollectionType } from "./ApplicationDocument";
import * as ModelPreset from "../model/Preset";

// ui extensions
export default interface Preset extends ModelPreset.default {
    
    /**
     * current source of the preset
     */
    source: PresetCollectionType;
    
    /**
     * true when the preset is selected in the ui.
     */
    selected: boolean;

    /**
     * the origin of this preset
     */
    origin: PresetHistory;
}

export interface PresetHistory {
    
    /**
     * preset name when history item was created
     */
    name: string;

    /**
     * the index of this preset before it was copied.
     */
    index: number;

    /**
     * the source collection the preset was copied from.
     */
    collection: PresetCollectionType;
}