import Preset from "./Preset";
export declare const MovePresetActionKey: string;
export interface MovePresetAction {
    readonly type: "U/*/presets/[]";
    readonly preset: Preset;
    readonly displacement: number;
}
export declare const createMovePresetAction: (preset: Preset, displacement: number) => MovePresetAction;
export interface MovePreset {
    movePreset(preset: Preset, displacement: number): void;
}
