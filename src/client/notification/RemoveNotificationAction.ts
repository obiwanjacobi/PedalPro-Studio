import { Notification } from "./Notification";

const RemoveNotificationActionKey = "D/notification/";

export interface RemoveNotificationAction {
    readonly type: "D/notification/";
    readonly notification: Notification;
}

export const createRemoveNotificationAction = (notification: Notification): RemoveNotificationAction => {
    return { type: RemoveNotificationActionKey, notification: notification };
};

export interface RemoveNotification {
    removeNotification(notification: Notification): void;
}