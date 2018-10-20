// bit flags
export enum InteractiveOptions {
    None = 0,
    Ok = 1,
    Cancel = 2,
    OkCancel = 3,
}

export interface Interactive {
    icon?: React.ReactNode;
    message: string;
    caption: string;
    buttons: InteractiveOptions;
    action?: InteractiveOptions;
}