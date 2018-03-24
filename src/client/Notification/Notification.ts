
export interface Notification {
    type: "info" | "warning" | "error" | "critical";
    message: string;
    context?: string;
}