import { PresetCollectionType } from "./ApplicationDocument";
import Preset from "./Preset";
export interface CopyPresetsAction {
    readonly type: "C/*/presets/";
    readonly presets: Preset[];
    readonly target: PresetCollectionType;
}
export declare const createCopyPresetsAction: (presets: Preset[], target: string) => CopyPresetsAction;
export interface CopyPresets {
    copyPresets(presets: Preset[], target: string): void;
}
