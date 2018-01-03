import * as React from "react";

export default class StrictComponent<
                ActionsT = {}, 
                EventsT = {},
                PropsT = {}, 
                StateT = {}>
        extends React.Component<ActionsT & EventsT & PropsT, StateT> {
    
    protected get properties(): Readonly<PropsT> {
        return this.props;
    }

    protected get actions(): Readonly<ActionsT> {
        return this.props;
    }

    protected get events(): Readonly<EventsT> {
        return this.props;
    }
}