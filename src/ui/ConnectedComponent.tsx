import * as React from "react";
import ApplicationDocument from "../client/ApplicationDocument";
import { connect } from "react-redux";

import { makeObject } from "../Extensions";

// selector function that selects component props from store state.
export interface StateSelector<StoreStateT, StatePropsT> {
    (state: StoreStateT): StatePropsT;
}

// @ts-ignore
let StateWrapper = props => props.children;
// @ts-ignore
StateWrapper = connect(mapStateToProps, mapDispatchToProps)(StateWrapper);

export default abstract class ConnectedComponent<
                        StatePropsT, 
                        ActionsT, 
                        EventsT = {},
                        ComponentPropsT = {}, 
                        ComponentStateT = {}> 
               extends React.Component<StatePropsT & ActionsT & EventsT & ComponentPropsT, ComponentStateT> {

    private selector: StateSelector<ApplicationDocument, StatePropsT>;

    public render() {
        return (
            <StateWrapper>
                {this.props.children}
            </StateWrapper>
        );
    }

    protected get componentProps(): Readonly<ComponentPropsT> {
        return this.props;
    }
    
    protected get stateProps(): Readonly<StatePropsT> {
        return this.props;
    }

    protected get actions(): Readonly<ActionsT> {
        return this.props;
    }

    protected get events(): Readonly<EventsT> {
        return this.props;
    }

    protected abstract createStateSelector(): StateSelector<ApplicationDocument, StatePropsT>;

    protected extractComponentPropsFromState(
        state: ApplicationDocument, props: ComponentPropsT): StatePropsT & ComponentPropsT {
            if (!this.selector) {
                this.selector = this.createStateSelector();
            }

            const stateProps = this.selector(state);
            return { ...makeObject(stateProps), ...makeObject(props) };
    }
}