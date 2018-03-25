import { ProgressInfo } from "./ScreenState";

export const ProgressActionKey: string = "U/screen/progress";

export interface ProgressAction {
    type: "U/screen/progress";
    progress: ProgressInfo;
}

export const createProgressAction = (progress: ProgressInfo) => {
    return <ProgressAction> { type: ProgressActionKey, progress: progress };
};