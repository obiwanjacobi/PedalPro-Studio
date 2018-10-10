import * as React from "react";
import { Typography } from "@material-ui/core";

export interface TitleProps {
    caption: string;
    pre?: string;
    sub?: string;
}

export class Title extends React.Component<TitleProps> {
    constructor(props: TitleProps) {
        super(props);
    }
    
    public render() {
        return (
            <div style={{margin: "0 auto"}}>
                {this.props.pre && 
                    <Typography variant="subheading" style={{display: "inline-block"}}>{this.props.pre}</Typography>}
                {this.props.pre && this.props.caption && 
                    <div style={{display: "inline-block", width: "12px"}}/>}
                {this.props.caption &&
                    <Typography variant="title" style={{display: "inline-block"}}>{this.props.caption}</Typography>}
                {this.props.caption && this.props.sub &&
                    <div style={{display: "inline-block", width: "12px"}}/>}
                {this.props.sub &&
                    <Typography variant="body2" style={{display: "inline-block"}}>{this.props.sub}</Typography>}
            </div>
        );
    }
}