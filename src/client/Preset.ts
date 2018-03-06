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
    const presetChanged = !(
        preset.origin.index === preset.index &&
        preset.origin.name === preset.name
    );

    const traitsChanged = !(
        preset.traits.expression === preset.origin.traits.expression &&
        preset.traits.humbucker === preset.origin.traits.humbucker &&
        preset.traits.singleCoil === preset.origin.traits.singleCoil &&
        preset.traits.stereo === preset.origin.traits.stereo
    );

    return presetChanged && traitsChanged;
}