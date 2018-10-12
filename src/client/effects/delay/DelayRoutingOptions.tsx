import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { DelayRouting } from "../../../model/Delay";

type DelayRoutingOptionsProps = {
    routing: DelayRouting
};
type DelayRoutingOptionsEvents = {
    onChange: (value: DelayRouting) => void;
};
type DelayRoutingOptionsAllProps = DelayRoutingOptionsProps & DelayRoutingOptionsEvents;

export class DelayRoutingOptions
    extends React.Component<DelayRoutingOptionsAllProps> {

    public constructor(props: DelayRoutingOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Delay Routing</Typography>
                <Select value={this.props.routing} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={DelayRouting.None}>None</MenuItem>
                    <MenuItem value={DelayRouting.Left}>Left</MenuItem>
                    <MenuItem value={DelayRouting.Right}>Right</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}