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
    uiSelected: boolean;

    /**
     * true when the preset is expanded in the ui.
     */
    uiExpanded: boolean;

    /**
     * the origin of this preset
     */
    origin: ModelPreset.default;
}

export function presetHasChanged(preset: Preset): boolean {
    return !(
        preset.origin.index === preset.index &&
        preset.origin.name === preset.name &&
        preset.origin.expression === preset.expression &&
        preset.origin.stereo === preset.stereo
    );
};