import Preset from "./Preset";
export declare enum PresetCollectionType {
    device = "device",
    storage = "storage",
    factory = "factory",
}
export default class ApplicationDocument {
    readonly device: Preset[];
    readonly storage: Preset[];
    readonly factory: Preset[];
    readonly screen: ScreenState;
    constructor(device?: Preset[] | null, storage?: Preset[] | null, factory?: Preset[] | null, screenState?: ScreenState | null);
    copyOverride(device?: Preset[] | null, storage?: Preset[] | null, factory?: Preset[] | null): ApplicationDocument;
    copyOverrideScreen(screen: ScreenState): ApplicationDocument;
}
export declare class ScreenState {
    targetPresetDialogOpen?: boolean;
    constructor(targetPresetDialogOpen?: boolean);
    copyOverride(targetPresetDialogOpen?: boolean): ScreenState;
}
