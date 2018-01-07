import { AnyAction, Store, createStore } from "redux";

import ApplicationDocument from "./ApplicationDocument";
import * as PresetStateReducer from "./PresetStateReducer";
import * as ScreenStateReducer from "./ScreenStateReducer";

export default class ApplicationStore {
    public readonly store: Store<ApplicationDocument>;

    public constructor() {
        this.store = createStore(this.appReduce, new ApplicationDocument());
    }

    private appReduce(state: ApplicationDocument, action: AnyAction): ApplicationDocument {
        let actionType = <string> action.type;
        
        // redux-specific action types
        if (actionType.startsWith("@")) { return state; }
        
        if (actionType.indexOf("screen") > 0) {
            return ScreenStateReducer.reduce(state, action);
        }

        return PresetStateReducer.reduce(state, action);
    }
}