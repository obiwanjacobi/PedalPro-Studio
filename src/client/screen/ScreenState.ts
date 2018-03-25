export interface ProgressInfo {
    title: string;
    message: string;
    percent: number;
}

export class ScreenState {
    public readonly progress?: Readonly<ProgressInfo>;

    public constructor(progress?: ProgressInfo) {
        this.progress = progress;
    }

    public copyOverride(progress: ProgressInfo): ScreenState {
        return new ScreenState(progress
        );
    }
}