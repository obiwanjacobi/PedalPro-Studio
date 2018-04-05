export interface ProgressInfo {
    title: string;
    message: string;
    percent: number;
}

export class ScreenState {
    public readonly progress?: Readonly<ProgressInfo>;
    public readonly pasteOpen: boolean;

    public constructor(progress?: ProgressInfo, pasteOpen?: boolean) {
        this.progress = progress;
        this.pasteOpen = !!pasteOpen;
    }

    public copyOverride(progress: ProgressInfo): ScreenState {
        return new ScreenState(progress
        );
    }
}