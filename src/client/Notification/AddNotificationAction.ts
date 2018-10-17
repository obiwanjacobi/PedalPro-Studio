import { Notification, NotificationActions } from "./Notification";

const AddNotificationActionKey = "C/notification/";

export interface AddNotificationAction {
    readonly type: "C/notification/";
    readonly notification: Notification;
}

export const createAddNotificationAction = (notification: Notification): AddNotificationAction => {
    return { type: AddNotificationActionKey, notification: notification };
};

export interface AddNotification {
    addNotification(notification: Notification): Promise<NotificationActions>;
}