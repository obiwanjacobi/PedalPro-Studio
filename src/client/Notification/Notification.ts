export enum NotificationActions {
    Ok = 1,
    Cancel = 2,
    OkCancel = 3,
    
}

export interface Notification {
    type: "question" | "info" | "warning" | "error" | "critical";
    message: string;
    context?: string;
    actions?: NotificationActions;
}