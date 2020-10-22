import { ProgressInfo } from "./ScreenState";

export interface ProgressAction {
    type: "U/screen/progress";
    progress: ProgressInfo;
}

export const createProgressAction = (progress: ProgressInfo) => {
    return { type: "U/screen/progress", progress: progress };
};