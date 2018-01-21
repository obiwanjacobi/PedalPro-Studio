import * as React from "react";

export default class Control<PropsT = {}, StateT = {}> extends React.Component<PropsT, StateT> {
    public shouldComponentUpdate(nextProps: PropsT, nextState: StateT): boolean {
        return this.props !== nextProps || this.state !== nextState;
    }
}