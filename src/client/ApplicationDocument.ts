import { Preset } from "./Preset";
import { Notification } from "./notification/Notification";
import { ScreenState } from "./screen/ScreenState";
import { DeviceIdentity } from "../model/DeviceIdentity";

export enum PresetCollectionType {
    device,
    storage,
    factory,
    clipboard,
}

export class ApplicationDocument {
    public readonly deviceInfo?: Readonly<DeviceIdentity>;

    public readonly device: Readonly<Preset>[];
    public readonly storage: Readonly<Preset>[];
    public readonly factory: Readonly<Preset>[];
    public readonly clipboard: Readonly<Preset>[];

    public readonly screen: Readonly<ScreenState>;
    public readonly notifications: Readonly<Notification>[];

    public constructor(deviceInfo: DeviceIdentity | undefined = undefined,
                       device: Preset[] | null = null,
                       storage: Preset[] | null = null,
                       factory: Preset[] | null = null,
                       clipboard: Preset[] | null = null,
                       screen: ScreenState | null = null,
                       notifications: Notification[] | null = null) {

        this.deviceInfo = deviceInfo;                
        this.device = device === null ? Array<Preset>() : device;
        this.storage = storage === null ? Array<Preset>() : storage;
        this.factory = factory === null ? Array<Preset>() : factory;
        this.clipboard = clipboard === null ? Array<Preset>() : clipboard;

        this.screen = screen === null ? new ScreenState() : screen;
        this.notifications = notifications === null ? Array<Notification>() : notifications;
    }

    public copyOverride(device: Preset[] | null = null,
                        storage: Preset[] | null = null,
                        factory: Preset[] | null = null,
                        clipboard: Preset[] | null = null): ApplicationDocument {

        return new ApplicationDocument(
                        this.deviceInfo,
                        device === null ? this.device : device,
                        storage === null ? this.storage : storage,
                        factory === null ? this.factory : factory,
                        clipboard === null ? this.clipboard : clipboard,
                        this.screen,
                        this.notifications,
        );
    }

    public copyOverrideScreen(screen: ScreenState): ApplicationDocument {
        return new ApplicationDocument(
            this.deviceInfo, this.device, this.storage, this.factory, this.clipboard, screen, this.notifications
        );
    }

    public copyOverrideNotification(notifications: Notification[]): ApplicationDocument {
        return new ApplicationDocument(
            this.deviceInfo, this.device, this.storage, this.factory, this.clipboard, this.screen, notifications);
    }

    public copyOverrideDeviceInfo(deviceInfo: DeviceIdentity): ApplicationDocument {
        return new ApplicationDocument(
            deviceInfo, this.device, this.storage, this.factory, this.clipboard, this.screen, this.notifications
        );
    }
}
