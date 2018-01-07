import { ScreenState } from "./ApplicationDocument";

const UpdateScreenActionKey = "U/screen/*";

export interface UpdateScreenAction {
    readonly type: "U/screen/*";
    readonly screenState: ScreenState;
}

export const createUpdateScreenAction = (screenState: ScreenState): UpdateScreenAction => {
    return <UpdateScreenAction> { type: UpdateScreenActionKey, screenState: screenState };
};

export interface UpdateScreen {
    updateScreen(state: ScreenState): void;
}