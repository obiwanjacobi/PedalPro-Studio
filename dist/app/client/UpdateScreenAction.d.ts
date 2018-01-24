import { ScreenState } from "./ApplicationDocument";
export interface UpdateScreenAction {
    readonly type: "U/screen/";
    readonly screenState: ScreenState;
}
export declare const createUpdateScreenAction: (screenState: ScreenState) => UpdateScreenAction;
export interface UpdateScreen {
    updateScreen(state: ScreenState): void;
}
