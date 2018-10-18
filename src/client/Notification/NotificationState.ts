import { Notification } from "./Notification";

export interface NotificationState {
    notifications: Notification[];
    interactive?: Notification;
}