import { ScreenState }  from "./ScreenState";

export interface UpdateScreenAction {
    readonly type: "U/screen/";
    readonly screenState: ScreenState;
}

export const createUpdateScreenAction = (screenState: ScreenState): UpdateScreenAction => {
    return { type: "U/screen/", screenState: screenState };
};

export interface UpdateScreen {
    updateScreen(state: ScreenState): void;
}