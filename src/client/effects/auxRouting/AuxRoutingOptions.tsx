import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";
import { AuxRouting } from "../../../model/AuxRouting";

type AuxRoutingOptionsProps = {
    routing: AuxRouting;
};
type AuxRoutingOptionsEvents = {
    onChange: (value: AuxRouting) => void;
};
type AuxRoutingOptionsAllProps = AuxRoutingOptionsProps & AuxRoutingOptionsEvents;

export class AuxRoutingOptions
    extends React.Component<AuxRoutingOptionsAllProps> {

    public constructor(props: AuxRoutingOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Aux Routing</Typography>
                <Select value={this.props.routing} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={AuxRouting.None}>None</MenuItem>
                    <MenuItem value={AuxRouting.Mixer}>Stereo Send/Return &amp; Mixer</MenuItem>
                    <MenuItem value={AuxRouting.LeftOnly}>Left Send/Return on Left channel</MenuItem>
                    <MenuItem value={AuxRouting.RightOnly}>Right Send/Return on Right channel</MenuItem>
                    <MenuItem value={AuxRouting.SeriesLeft}>Left => Right Sends/Returns on Left channel</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}