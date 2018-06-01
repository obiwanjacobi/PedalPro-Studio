export interface ProgressInfo {
    title: string;
    message: string;
    percent: number;
}

export interface ScreenState {
    progress?: Readonly<ProgressInfo>;
    pasteOpen: boolean;
    moveOpen: boolean;
}
