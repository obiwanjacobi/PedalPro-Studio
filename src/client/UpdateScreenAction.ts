import { ScreenState } from "./ApplicationDocument";

const UpdateScreenActionKey = "U/screen/state";

export interface UpdateScreenAction {
    readonly type: "U/screen/state";
    readonly screenState: ScreenState;
}

export const createUpdateScreenStateAction = (screenState: ScreenState): UpdateScreenAction => {
    return <UpdateScreenAction> { type: UpdateScreenActionKey, screenState: screenState };
};