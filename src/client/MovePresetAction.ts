import { Preset } from "./Preset";

export interface MovePresetAction {
    readonly type: "U/*/presets/[]";
    readonly preset: Preset;
    readonly displacement: number;
}

export const createMovePresetAction = (preset: Preset, displacement: number): MovePresetAction => {
    return { type: "U/*/presets/[]", preset: preset, displacement: displacement };
};

export interface MovePreset {
    movePreset(preset: Preset, displacement: number): void;
}