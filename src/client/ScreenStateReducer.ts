import { AnyAction } from "redux";

import { UpdateScreenAction } from "./UpdateScreenAction";
import ApplicationDocument, { ScreenState } from "./ApplicationDocument";

export type ScreenAction = UpdateScreenAction;

// could be moved to parent reducer
export const reduce = (state: ApplicationDocument, action: AnyAction): ApplicationDocument => {
    
    return reduceScreen(state, <ScreenAction> action);
};

const reduceScreen = (state: ApplicationDocument, action: ScreenAction): ApplicationDocument => {
    switch (action.type) {
        case "U/screen/*":
        return reduceUpdateScreen(state, action.screenState);

        default:
        throw new Error("Unknown action type in ScreenStateReducer.");
    }
};

const reduceUpdateScreen = (state: ApplicationDocument, screen: ScreenState): ApplicationDocument => {
    const newScreen = state.screen.copyOverride(screen.targetPresetDialogOpen);
    return state.copyOverrideScreen(newScreen);
};