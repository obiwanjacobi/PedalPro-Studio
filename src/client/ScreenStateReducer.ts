import { UpdateScreenAction } from "./UpdateScreenAction";
import { ScreenState } from "./ApplicationDocument";

// all actions this reducer handles
export type ScreenAction = UpdateScreenAction;

export const reduce = (state: ScreenState = new ScreenState(), action: ScreenAction): ScreenState => {
    switch (action.type) {
        case "U/screen/*":
        return reduceUpdateScreen(state, action.screenState);

        default:
        return state;
    }
};

const reduceUpdateScreen = (state: ScreenState, screen: ScreenState): ScreenState => {
    return state.copyOverride(screen.targetPresetDialogOpen);
};