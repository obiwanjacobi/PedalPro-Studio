import { Store } from "redux";
import ApplicationDocument from "./ApplicationDocument";
export default class ApplicationStore {
    readonly store: Store<ApplicationDocument>;
    constructor();
    private appReduce(state, action);
}
