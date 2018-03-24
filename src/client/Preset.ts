import { PresetCollectionType } from "./ApplicationDocument";
import * as ModelPreset from "../model/Preset";
import { PresetTraits } from "../model/PresetTraits";

// ui extensions
export interface Preset extends ModelPreset.Preset {
    
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
    origin: ModelPreset.Preset;
}

function traitsEqual(origin: PresetTraits, traits: PresetTraits): boolean {
    return (
        traits.expression === origin.expression &&
        traits.humbucker === origin.humbucker &&
        traits.singleCoil === origin.singleCoil &&
        traits.stereo === origin.stereo
    );
}

export function onlyIndexHasChanged(preset: Preset): boolean {
    const indexChanged = (
        preset.origin.index !== preset.index &&
        preset.origin.name === preset.name
    );

    const traitsSame = traitsEqual(preset.origin.traits, preset.traits);

    return indexChanged && traitsSame;
}
export function presetHasChanged(preset: Preset): boolean {
    const presetChanged = !(
        preset.origin.index === preset.index &&
        preset.origin.name === preset.name
    );

    const traitsChanged = !traitsEqual(preset.origin.traits, preset.traits);

    return presetChanged || traitsChanged;
}