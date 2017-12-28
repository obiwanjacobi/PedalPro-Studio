// TODO: make this into a class
// need to make the class instance a POJO by calling (ctor):
//  Object.setPrototypeOf(this, Object.getPrototypeOf({}));

/**
 * Template for all actions in the application.
 */
export interface Action<T extends string, P> {
    /**
     * A unique string that identifies the action:
     *  "[operation]/[source]/[entity][/*]"
     *  operation: C|R|U|D
     *  source: local|device|storage|factory
     *  entity: preset
     *  *: indicates a set/collection if present
     */
    readonly type: T;
    readonly params: P;
}

/**
 * Creates a new Action instance for dispatching.
 * @param type the type of Action.
 * @param params the Action-specific data.
 */
export const createAction = <T extends string, P>(type: T, params: P): Action<T, P> => {
    return <Action<T, P>> { type: type, params: params };
};
