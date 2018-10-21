// bit flags
export enum InteractiveOptions {
    None = 0,
    Ok = 1,
    Cancel = 2,
    OkCancel = 3,
}

export enum InteractiveIcon {
    None,
    Exclamation,
    Question,
}

export interface Interactive {
    icon?: InteractiveIcon;
    message: string;
    caption: string;
    buttons: InteractiveOptions;
    action?: InteractiveOptions;
}