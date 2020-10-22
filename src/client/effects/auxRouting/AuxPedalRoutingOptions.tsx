import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";
import { AuxRouting } from "../../../model/AuxRouting";

type AuxPedalRoutingOptionsProps = {
    routing: AuxRouting;
};
type AuxPedalRoutingOptionsEvents = {
    onChange: (value: AuxRouting) => void;
};
type AuxPedalRoutingOptionsAllProps = AuxPedalRoutingOptionsProps & AuxPedalRoutingOptionsEvents;

export class AuxPedalRoutingOptions
    extends React.Component<AuxPedalRoutingOptionsAllProps> {

    public constructor(props: AuxPedalRoutingOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Pedal Routing</Typography>
                <Select value={this.props.routing} onChange={this.onChange} style={{ margin: "8px"}}>
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