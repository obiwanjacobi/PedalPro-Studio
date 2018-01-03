import * as ModelPreset from "../model/Preset";

// ui extensions
export default interface Preset extends ModelPreset.default {
    /**
     * source of the preset (local/device/storage/factory)
     */
    source: string;

    /**
     * true when the preset is selected in the ui.
     */
    selected: boolean;
}