import { Preset } from "./Preset";
import { PresetIndex } from "../../model/Preset";

export interface MovePresetsAction {
    readonly type: "U/*/presets/[]";

    readonly presets: Preset[];
    readonly targetIndex: PresetIndex;
    readonly swap: boolean;
}

export const createMovePresetsAction = (
    presets: Preset[], targetIndex: PresetIndex, swap?: boolean): MovePresetsAction => {

    return { 
        type: "U/*/presets/[]", 
        presets: presets, 
        targetIndex: targetIndex,
        swap: !!swap 
    };
};

export interface MovePresets {
    movePresets(presets: Preset[], targetIndex: PresetIndex, swap?: boolean): void;
}

// used in display list
export interface CanMoveDown {
    canMoveDown(preset: Preset): boolean;
}