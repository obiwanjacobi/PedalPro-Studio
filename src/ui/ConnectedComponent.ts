import { Component } from "react";
import ApplicationDocument from "../client/ApplicationDocument";

// selector function that selects props from store state.
export interface StateSelector<StoreStateT, StatePropsT> {
    (state: StoreStateT): StatePropsT;
}

export default abstract class ConnectedComponent<
                        StatePropsT, 
                        ActionsT, 
                        ComponentPropsT = {}, 
                        ComponentStateT = {}> 
               extends Component<StatePropsT & ActionsT & ComponentPropsT, ComponentStateT> {

    // type ConnectedComponentProps = StatePropsT & ActionsT & ComponentPropsT;

    private selector: StateSelector<ApplicationDocument, StatePropsT>;

    protected get componentProps(): Readonly<ComponentPropsT> {
        return this.props;
    }
    
    protected get stateProps(): Readonly<StatePropsT> {
        return this.props;
    }

    protected get actions(): Readonly<ActionsT> {
        return this.props;
    }

    protected abstract createStateSelector(): StateSelector<ApplicationDocument, StatePropsT>;

    protected extractComponentPropsFromState(
        state: ApplicationDocument, props: ComponentPropsT): StatePropsT & ComponentPropsT {
            if (!this.selector) {
                this.selector = this.createStateSelector();
            }

            const stateProps = this.selector(state);
            // return { ...stateProps, ...props };
            // bah!
            const result = {};
            // @ts-ignore
            for (const member of props) {
                // @ts-ignore
                result[member] = props[member];
            }
            // @ts-ignore
            for (const member of stateProps) {
                // @ts-ignore
                result[member] = stateProps[member];
            }
            return <StatePropsT & ComponentPropsT> result;
    }
}