import { AnyAction, Store, createStore } from "redux";

import ApplicationDocument from "./ApplicationDocument";
import * as PresetStateReducer from "./PresetStateReducer";

export default class ApplicationStore {
    public readonly store: Store<ApplicationDocument>;

    public constructor() {
        this.store = createStore(this.appReduce, new ApplicationDocument());
    }

    private appReduce(state: ApplicationDocument, action: AnyAction): ApplicationDocument {
        return PresetStateReducer.reduce(state, action);
    }
}