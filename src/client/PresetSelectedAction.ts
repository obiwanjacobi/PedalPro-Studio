import Preset from "./Preset";

export const PresetSelectedActionKey: string = "U/*/preset.selected";

export interface PresetSelectedAction {
    readonly type: "U/*/preset.selected";
    readonly preset: Preset;
    readonly selected: boolean;
}

export const createPresetSelectedAction = (preset: Preset, selected: boolean): PresetSelectedAction => {
    return <PresetSelectedAction> { type: PresetSelectedActionKey, preset: preset, selected: selected };
};