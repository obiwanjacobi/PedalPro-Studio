import Preset from "./Preset";

export const MovePresetActionKey: string = "U/*/presets/[]";

export interface MovePresetAction {
    readonly type: "U/*/presets/[]";
    readonly preset: Preset;
    readonly displacement: number;
}

export const createMovePresetAction = (preset: Preset, displacement: number): MovePresetAction => {
    return <MovePresetAction> { type: MovePresetActionKey, preset: preset, displacement: displacement };
};

export interface MovePreset {
    movePreset(preset: Preset, displacement: number): void;
}