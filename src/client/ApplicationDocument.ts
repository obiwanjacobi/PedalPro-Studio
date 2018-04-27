import { Preset } from "./Preset";
import * as ModelPreset from "../model/Preset";
import { Notification } from "./notification/Notification";
import { ScreenState } from "./screen/ScreenState";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { StorageBank } from "./StorageBank";

export enum PresetCollectionType {
    device = "device",
    storage = "storage",
    factory = "factory",
    clipboard = "clipboard",
}

export interface ApplicationDocument {
    deviceInfo?: DeviceIdentity;
    empty?: ModelPreset.Preset;
    device: Preset[];
    storage: Preset[];
    banks: StorageBank[];
    factory: Preset[];
    clipboard: Preset[];
    screen: ScreenState;
    notifications: Notification[];
}

// class _ApplicationDocument {
//     public readonly deviceInfo?: Readonly<DeviceIdentity>;
//     public readonly empty?: Readonly<ModelPreset.Preset>;

//     public readonly device: Readonly<Preset>[];
//     public readonly storage: Readonly<Preset>[];
//     public readonly banks: Readonly<StorageBank>[];
//     public readonly factory: Readonly<Preset>[];
//     public readonly clipboard: Readonly<Preset>[];

//     public readonly screen: Readonly<ScreenState>;
//     public readonly notifications: Readonly<Notification>[];

//     public constructor(deviceInfo: DeviceIdentity | undefined = undefined,
//                        empty: ModelPreset.Preset | undefined = undefined,
//                        device: Preset[] | null = null,
//                        storage: Preset[] | null = null,
//                        factory: Preset[] | null = null,
//                        clipboard: Preset[] | null = null,
//                        screen: ScreenState | null = null,
//                        notifications: Notification[] | null = null) {

//         this.deviceInfo = deviceInfo;
//         this.empty = empty;
//         this.device = device === null ? Array<Preset>() : device;
//         this.storage = storage === null ? Array<Preset>() : storage;
//         this.factory = factory === null ? Array<Preset>() : factory;
//         this.clipboard = clipboard === null ? Array<Preset>() : clipboard;

//         this.screen = screen === null ? new ScreenState() : screen;
//         this.notifications = notifications === null ? Array<Notification>() : notifications;
//     }

//     public copyOverride(device: Preset[] | null = null,
//                         storage: Preset[] | null = null,
//                         factory: Preset[] | null = null,
//                         clipboard: Preset[] | null = null): ApplicationDocument {

//         return new ApplicationDocument(
//                         this.deviceInfo,
//                         this.empty, 
//                         device === null ? this.device : device,
//                         storage === null ? this.storage : storage,
//                         factory === null ? this.factory : factory,
//                         clipboard === null ? this.clipboard : clipboard,
//                         this.screen,
//                         this.notifications,
//         );
//     }

//     public copyOverrideScreen(screen: ScreenState): ApplicationDocument {
//         return new ApplicationDocument(
//             this.deviceInfo, this.empty, 
//             this.device, this.storage, this.factory, this.clipboard, screen, this.notifications
//         );
//     }

//     public copyOverrideNotification(notifications: Notification[]): ApplicationDocument {
//         return new ApplicationDocument(
//             this.deviceInfo, this.empty, 
//             this.device, this.storage, this.factory, this.clipboard, this.screen, notifications
//         );
//     }

//     public copyOverrideDeviceInfo(deviceInfo: DeviceIdentity, empty?: ModelPreset.Preset): ApplicationDocument {
//         return new ApplicationDocument(
//             deviceInfo, empty, 
//             this.device, this.storage, this.factory, this.clipboard, this.screen, this.notifications
//         );
//     }
// }
