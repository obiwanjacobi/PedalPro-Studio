
export interface Notification {
    type: "question" | "info" | "warning" | "error" | "critical";
    message: string;
    context?: string;
}