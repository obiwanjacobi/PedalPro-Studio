import * as React from "react";
import { Typography } from "@material-ui/core";

export interface TitleProps {
    caption: string;
    prelude: string;
}

export class Title extends React.Component<TitleProps> {
    constructor(props: TitleProps) {
        super(props);
    }
    
    public render() {
        return (
            <div style={{margin: "0 auto"}}>
                {this.props.prelude && 
                    <Typography variant="subheading" style={{display: "inline"}}>{this.props.prelude}</Typography>}
                {this.props.caption &&
                    <Typography variant="title" style={{display: "inline"}}>{this.props.caption}</Typography>}
            </div>
        );
    }
}