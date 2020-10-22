import { ScreenState }  from "./ScreenState";

export interface UpdateScreenAction {
    readonly type: "U/screen/";
    readonly screenState: ScreenState;
}

export const createUpdateScreenAction = (screenState: Partial<ScreenState>): UpdateScreenAction => {
    return { type: "U/screen/", screenState: { pasteOpen: false, moveOpen: false, ...screenState } };
};

export interface UpdateScreen {
    updateScreen(state: Partial<ScreenState>): void;
}