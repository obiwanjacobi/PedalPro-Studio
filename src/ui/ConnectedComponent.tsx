import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import ApplicationDocument from "../client/ApplicationDocument";

/**
 * Derive the Higher Order Component (HOC) from this base class
 * and implement (redux) state handling methods and action-handlers.
 */
export default abstract class ConnectedComponent<
                        StatePropsT,        // properties that are retrieved from the (application) state.
                        ActionsT,           // actions that modify the (application) state (reducers).
                        OwnPropsT = {}>     // react props for this component
               extends React.Component<StatePropsT & ActionsT & OwnPropsT> {

    public constructor(props: StatePropsT & ActionsT & OwnPropsT) {
        super(props);
        // @ts-ignore
        this.StateWrapper = connect<StatePropsT, ActionsT, OwnPropsT, ApplicationDocument>(
            (state: ApplicationDocument) => { return this.extractComponentPropsFromState(state); }, 
            (dispatch: Dispatch<ApplicationDocument>) => { return this.createActionObject(dispatch); }
        )(this.StateWrapper);
    }

    protected renderConnection(content: JSX.Element): JSX.Element {
        return (
            <this.StateWrapper>
                {content}
            </this.StateWrapper>
        );
    }

    protected get stateProps(): Readonly<StatePropsT> {
        return this.props;
    }

    protected get actions(): Readonly<ActionsT> {
        return this.props;
    }

    protected abstract extractComponentPropsFromState(state: ApplicationDocument): StatePropsT;
    protected abstract createActionObject(dispatch: Dispatch<ApplicationDocument>): ActionsT;

    // @ts-ignore
    private StateWrapper = props => props.children;
}