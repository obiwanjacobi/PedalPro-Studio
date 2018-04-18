import * as React from "react";

const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
};

export class FlexContainer extends React.Component {
    public render() {
        return (
            <div style={containerStyles}>
                {this.props.children}
            </div>
        );
    }
}