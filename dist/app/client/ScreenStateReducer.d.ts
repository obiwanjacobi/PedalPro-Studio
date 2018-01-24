import { UpdateScreenAction } from "./UpdateScreenAction";
import { ScreenState } from "./ApplicationDocument";
export declare type ScreenAction = UpdateScreenAction;
export declare const reduce: (state: ScreenState | undefined, action: UpdateScreenAction) => ScreenState;
