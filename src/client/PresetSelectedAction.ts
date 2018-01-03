import Preset from "./Preset";

export const PresetSelectedActionKey: string = "U/*/preset.selected";

export interface PresetSelectedAction {
    readonly type: "U/*/preset.selected";
    readonly presets: Preset[];
    readonly selected: boolean;
}

export const createPresetSelectedAction = (presets: Preset[], selected: boolean): PresetSelectedAction => {
    return <PresetSelectedAction> { type: PresetSelectedActionKey, presets: presets, selected: selected };
};