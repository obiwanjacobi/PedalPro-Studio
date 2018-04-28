import { UpdateScreenAction } from "./UpdateScreenAction";
import { ScreenState, ProgressInfo } from "./ScreenState";
import { ProgressAction } from "./ProgressAction";
import { ScreenBuilder } from "./ScreenBuilder";

const reduceProgress = (state: ScreenState = ScreenBuilder.default, progress: ProgressInfo): ScreenState => {
    const builder = new ScreenBuilder(state);
    builder.mutable.progress = progress;
    return builder.detach();
};

// all actions this reducer handles
export type ScreenAction = UpdateScreenAction | ProgressAction;

export const reduce = (state: ScreenState = ScreenBuilder.default, action: ScreenAction): ScreenState => {
    switch (action.type) {
        case "U/screen/progress":
        return reduceProgress(state, action.progress);

        case "U/screen/":
        return action.screenState;

        default:
        return state;
    }
};