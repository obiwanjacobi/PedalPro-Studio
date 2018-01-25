import { UpdateScreenAction } from "./UpdateScreenAction";
import { ScreenState } from "./ApplicationDocument";

// all actions this reducer handles
export type ScreenAction = UpdateScreenAction;

const reduceUpdateScreen = (state: ScreenState, screen: ScreenState): ScreenState => {
    return state.copyOverride(screen.targetPresetDialogOpen);
};

export const reduce = (state: ScreenState = new ScreenState(), action: ScreenAction): ScreenState => {
    switch (action.type) {
        case "U/screen/":
        return reduceUpdateScreen(state, action.screenState);

        default:
        return state;
    }
};