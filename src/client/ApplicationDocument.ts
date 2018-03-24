import { Preset } from "./Preset";
import { Notification } from "./notification/Notification";
import { ScreenState } from "./screen/ScreenState";

export enum PresetCollectionType {
    device = "device",
    storage = "storage",
    factory = "factory",
}

export class ApplicationDocument {
    public readonly device: Readonly<Preset>[];
    public readonly storage: Readonly<Preset>[];
    public readonly factory: Readonly<Preset>[];

    public readonly screen: Readonly<ScreenState>;
    public readonly notifications: Readonly<Notification>[];

    public constructor(device: Preset[] | null = null,
                       storage: Preset[] | null = null,
                       factory: Preset[] | null = null,
                       screen: ScreenState | null = null,
                       notifications: Notification[] | null = null) {

        this.device = device === null ? Array<Preset>() : device;
        this.storage = storage === null ? Array<Preset>() : storage;
        this.factory = factory === null ? Array<Preset>() : factory;

        this.screen = screen === null ? new ScreenState() : screen;
        this.notifications = notifications === null ? Array<Notification>() : notifications;
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

    public copyOverrideNotification(notifications: Notification[]): ApplicationDocument {
        return new ApplicationDocument(
            this.device, this.storage, this.factory, this.screen, notifications);
    }
}
