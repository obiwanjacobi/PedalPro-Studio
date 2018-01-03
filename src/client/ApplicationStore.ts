import { AnyAction, Store, createStore } from "redux";

import ApplicationDocument from "./ApplicationDocument";
import * as PresetStateReducer from "./PresetStateReducer";

export default class ApplicationStore {
    public readonly store: Store<ApplicationDocument>;

    public constructor() {
        this.store = createStore(this.appReduce, new ApplicationDocument());
    }

    private appReduce(state: ApplicationDocument, action: AnyAction): ApplicationDocument {
        // redux-specific action types
        if ((<string> action.type).startsWith("@")) { return state; }
        
        return PresetStateReducer.reduce(state, action);
    }
}