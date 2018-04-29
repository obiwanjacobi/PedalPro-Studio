import { AnyAction, Store, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { ApplicationDocument } from "./ApplicationDocument";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";
import * as DeviceStateReducer from "./DeviceStateReducer";
import * as PresetStateReducer from "./PresetStateReducer";
import * as StorageStateReducer from "./StorageStateReducer";
import * as ScreenStateReducer from "./screen/ScreenStateReducer";
import * as NotificationReducer from "./notification/NotificationStateReduces";

export class ApplicationStore {
    public readonly store: Store<ApplicationDocument>;

    public constructor() {
        this.store = createStore(
            this.appReduce,
            ApplicationDocumentBuilder.default,
            applyMiddleware(ReduxThunk)
        );
    }

    private appReduce(state: ApplicationDocument, action: AnyAction): ApplicationDocument {
        let actionType = <string> action.type;
        
        if (actionType.indexOf("storage") > 0) {
            return StorageStateReducer.reduce(state, <StorageStateReducer.StorageAction> action);
        }
        if (actionType.indexOf("presets") > 0) {
            return PresetStateReducer.reduce(state, <PresetStateReducer.PresetAction> action);
        }
        // should come after 'presets'
        if (actionType.indexOf("device") > 0) {
            return DeviceStateReducer.reduce(state, <DeviceStateReducer.DeviceAction> action);
        }

        if (actionType.indexOf("screen") > 0) {
            const screen = ScreenStateReducer.reduce(state.screen, <ScreenStateReducer.ScreenAction> action);
            if (screen !== state.screen) {
                const builder = new ApplicationDocumentBuilder(state);
                builder.mutable.screen = screen;
                return builder.detach();
            }
        }
        
        if (actionType.indexOf("notification") > 0) {
            const notifications = NotificationReducer.reduce(
                state.notifications, <NotificationReducer.NotificationAction> action);
            if (notifications !== state.notifications) {
                const builder = new ApplicationDocumentBuilder(state);
                builder.mutable.notifications = notifications;
                return builder.detach();
            }
        }

        return state;
    }
}