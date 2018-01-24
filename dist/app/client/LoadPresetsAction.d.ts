import { Dispatch } from "redux";
import ApplicationDocument from "./ApplicationDocument";
import Preset from "./Preset";
import { PresetCollectionType } from "./ApplicationDocument";
export declare const LoadPresetsActionKey: string;
export interface LoadPresetsAction {
    readonly type: "R/device/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
}
export declare const createLoadPresetsAction: (dispatch: Dispatch<ApplicationDocument>, source: PresetCollectionType) => Promise<void>;
export interface LoadPresets {
    loadPresets(source: PresetCollectionType): Promise<void>;
}
