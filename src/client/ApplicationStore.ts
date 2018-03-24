import { AnyAction, Store, createStore } from "redux";

import { ApplicationDocument } from "./ApplicationDocument";
import * as PresetStateReducer from "./PresetStateReducer";
import * as ScreenStateReducer from "./screen/ScreenStateReducer";
import * as NotificationReducer from "./notification/NotificationStateReduces";

export class ApplicationStore {
    public readonly store: Store<ApplicationDocument>;

    public constructor() {
        this.store = createStore(
            this.appReduce,
            new ApplicationDocument()
        );
    }

    private appReduce(state: ApplicationDocument, action: AnyAction): ApplicationDocument {
        let actionType = <string> action.type;
        
        if (actionType.indexOf("screen") > 0) {
            return state.copyOverrideScreen(
                ScreenStateReducer.reduce(state.screen, <ScreenStateReducer.ScreenAction> action));
        }
        
        if (actionType.indexOf("presets") > 0) {
            return PresetStateReducer.reduce(state, <PresetStateReducer.PresetAction> action);
        }

        if (actionType.indexOf("notification") > 0) {
            return state.copyOverrideNotification(
                NotificationReducer.reduce(state.notifications, <NotificationReducer.NotificationAction> action));
        }

        return state;
    }
}