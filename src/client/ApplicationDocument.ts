import Preset from "./Preset";
import Fault from "../model/Fault";

export enum PresetCollectionType {
    device = "device",
    storage = "storage",
    factory = "factory",
}

export class ScreenState {
    public targetPresetDialogOpen?: boolean;

    public constructor(targetPresetDialogOpen?: boolean) {
        this.targetPresetDialogOpen = targetPresetDialogOpen ? targetPresetDialogOpen : false;
    }

    public copyOverride(targetPresetDialogOpen?: boolean): ScreenState {
        return new ScreenState(
            targetPresetDialogOpen !== undefined ? targetPresetDialogOpen : this.targetPresetDialogOpen
        );
    }
}

export default class ApplicationDocument {
    public readonly device: Preset[];
    public readonly storage: Preset[];
    public readonly factory: Preset[];

    public readonly screen: ScreenState;
    public readonly faults: Fault[];

    public constructor(device: Preset[] | null = null,
                       storage: Preset[] | null = null,
                       factory: Preset[] | null = null,
                       screen: ScreenState | null = null,
                       faults: Fault[] | null = null) {

        this.device = device === null ? Array<Preset>() : device;
        this.storage = storage === null ? Array<Preset>() : storage;
        this.factory = factory === null ? Array<Preset>() : factory;

        this.screen = screen === null ? new ScreenState() : screen;
        this.faults = faults === null ? Array<Fault>() : faults;
    }

    public copyOverride(device: Preset[] | null = null,
                        storage: Preset[] | null = null,
                        factory: Preset[] | null = null): ApplicationDocument {

        return new ApplicationDocument(
                        device === null ? this.device : device,
                        storage === null ? this.storage : storage,
                        factory === null ? this.factory : factory,
                        this.screen
        );
    }

    public copyOverrideScreen(screen: ScreenState): ApplicationDocument {
        return new ApplicationDocument(
            this.device, this.storage, this.factory, screen
        );
    }

    public copyOverrideFaults(faults: Fault[]): ApplicationDocument {
        return new ApplicationDocument(
            this.device, this.storage, this.factory, this.screen, faults);
    }
}
