import { Preset } from "./Preset";

export interface MovePresetsAction {
    readonly type: "U/*/presets/[]";

    readonly presets: Preset[];
    readonly targetIndex: number;

    // readonly preset: Preset;
    // readonly displacement: number;
}

// export const createMovePresetAction = (preset: Preset, displacement: number): MovePresetAction => {
//     return { type: "U/*/presets/[]", preset: preset, displacement: displacement };
// };

export const createMovePresetsAction = (presets: Preset[], targetIndex: number): MovePresetsAction => {
    return { type: "U/*/presets/[]", presets: presets, targetIndex: targetIndex };
};

export interface MovePresets {
    movePresets(presets: Preset[], targetIndex: number): void;
}

// export interface MovePreset {
//     movePreset(preset: Preset, displacement: number): void;
// }