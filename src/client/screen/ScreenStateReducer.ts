import { UpdateScreenAction } from "./UpdateScreenAction";
import { ScreenState, ProgressInfo } from "./ScreenState";
import { ProgressAction } from "./ProgressAction";

// all actions this reducer handles
export type ScreenAction = UpdateScreenAction | ProgressAction;

const reduceProgress = (state: ScreenState = new ScreenState(), progress: ProgressInfo): ScreenState => {
    return state.copyOverride(progress);
};

export const reduce = (state: ScreenState = new ScreenState(), action: ScreenAction): ScreenState => {
    switch (action.type) {
        case "U/screen/progress":
        return reduceProgress(state, action.progress);

        // case "U/screen/":
        default:
        return state;
    }
};