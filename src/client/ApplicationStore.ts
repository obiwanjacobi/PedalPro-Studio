import { AnyAction, Store, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { ApplicationDocument } from "./ApplicationDocument";
import * as PresetStateReducer from "./PresetStateReducer";
import * as ScreenStateReducer from "./screen/ScreenStateReducer";
import * as NotificationReducer from "./notification/NotificationStateReduces";

export class ApplicationStore {
    public readonly store: Store<ApplicationDocument>;

    public constructor() {
        this.store = createStore(
            this.appReduce,
            new ApplicationDocument(),
            applyMiddleware(ReduxThunk)
        );
    }

    private appReduce(state: ApplicationDocument, action: AnyAction): ApplicationDocument {
        let actionType = <string> action.type;
        
        if (actionType.indexOf("screen") > 0) {
            const screen = ScreenStateReducer.reduce(state.screen, <ScreenStateReducer.ScreenAction> action);
            if (screen !== state.screen) {
                return state.copyOverrideScreen(screen);
            }
        }
        
        if (actionType.indexOf("presets") > 0) {
            return PresetStateReducer.reduce(state, <PresetStateReducer.PresetAction> action);
        }

        if (actionType.indexOf("notification") > 0) {
            const notification = NotificationReducer.reduce(
                state.notifications, <NotificationReducer.NotificationAction> action);
            if (notification !== state.notifications) {
                return state.copyOverrideNotification(notification);
            }
        }

        return state;
    }
}