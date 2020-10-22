import * as React from "react";

export interface FlexContainerProps {
    vertical: boolean;
}

export class FlexContainer extends React.Component<FlexContainerProps> {
    public render() {
        return (
            <div style={{display: "flex", flexGrow: 1, flexDirection: this.props.vertical ? "column" : "row"}}>
                {this.props.children}
            </div>
        );
    }
}