import { Preset } from "./Preset";

export interface MovePresetsAction {
    readonly type: "U/*/presets/[]";

    readonly presets: Preset[];
    readonly targetIndex: number;
    readonly swap: boolean;
}

export const createMovePresetsAction = (presets: Preset[], targetIndex: number, swap?: boolean): MovePresetsAction => {
    return { 
        type: "U/*/presets/[]", 
        presets: presets, 
        targetIndex: targetIndex,
        swap: !!swap 
    };
};

export interface MovePresets {
    movePresets(presets: Preset[], targetIndex: number, swap?: boolean): void;
}
