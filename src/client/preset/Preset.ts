import { PresetCollectionType } from "../ApplicationDocument";
import { ItemUI } from "../ItemUI";
import * as ModelPreset from "../../model/Preset";

export interface PresetGroup {
    /**
     * the name of the group
     */
    name: string;
}

// ui extensions
export interface Preset extends ModelPreset.Preset {
    
    /**
     * current source of the preset
     */
    source: PresetCollectionType;
    
    /**
     * UI related preset settings
     */
    ui: ItemUI;

    /**
     * If set, marks this preset as part of a specific grouping
     */
    group?: PresetGroup;

    /**
     * the origin of this preset
     */
    origin: ModelPreset.Preset;
}
