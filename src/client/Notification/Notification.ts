export enum NotificationType {
    None,
    Info,
    Warning,
    Error,
    Critical
}

export interface Notification {
    type: NotificationType;
    message: string;
    context?: string;
}