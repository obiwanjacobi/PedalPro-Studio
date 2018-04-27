import { UpdateScreenAction } from "./UpdateScreenAction";
import { ScreenState, ProgressInfo } from "./ScreenState";
import { ProgressAction } from "./ProgressAction";
import { ScreenBuilder } from "./ScreenBuilder";

const reduceScreen = (state: ScreenState = ScreenBuilder.default, update: Partial<ScreenState>): ScreenState => {
    return ScreenBuilder.modify(state, update);
};

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
        return reduceScreen(state, action.screenState);

        default:
        return state;
    }
};