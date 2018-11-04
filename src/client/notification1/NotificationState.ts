import { Notification } from "./Notification";
import { Interactive } from "./Interactive";

export interface NotificationState {
    notifications: Notification[];

    interactive?: Interactive;
}