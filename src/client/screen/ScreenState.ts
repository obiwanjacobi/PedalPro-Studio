export interface ProgressInfo {
    title: string;
    message: string;
    percent: number;
}

export interface ScreenState {
    progress?: Readonly<ProgressInfo>;
    pasteOpen: boolean;
}

// class ScreenStateImpl {
//     public readonly progress?: Readonly<ProgressInfo>;
//     public readonly pasteOpen: boolean;

//     public constructor(progress?: ProgressInfo, pasteOpen?: boolean) {
//         this.progress = progress;
//         this.pasteOpen = !!pasteOpen;
//     }

//     public copyOverride(progress: ProgressInfo): ScreenState {
//         return new ScreenStateImpl(progress
//         );
//     }
// }