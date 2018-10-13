import * as React from "react";

import { FilterRouting } from "../../../model/Filters";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

type FilterRoutingOptionsProps = {
    routing: FilterRouting
};
type FilterRoutingOptionsEvents = {
    onChange: (value: FilterRouting) => void;
};
type FilterRoutingOptionsAllProps = FilterRoutingOptionsProps & FilterRoutingOptionsEvents;

export class FilterRoutingOptions extends React.Component<FilterRoutingOptionsAllProps> {

    public constructor(props: FilterRoutingOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Filter Routing</Typography>
                <Select value={this.props.routing} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={FilterRouting.Bypass}>None</MenuItem>
                    <MenuItem value={FilterRouting.PreF1}>Filter 1 Pre</MenuItem>
                    <MenuItem value={FilterRouting.PreF2}>Filter 2 Pre</MenuItem>
                    <MenuItem value={FilterRouting.PreF1F2}>Filter 1 &amp; 2 Pre</MenuItem>
                    <MenuItem value={FilterRouting.PostF1L}>Filter 1 Post (L)</MenuItem>
                    <MenuItem value={FilterRouting.PostF2L}>Filter 2 Post (L)</MenuItem>
                    <MenuItem value={FilterRouting.PostF2R}>Filter 2 Post (R)</MenuItem>
                    <MenuItem value={FilterRouting.PreF1PostF2R}>FIlter 1 Pre / Filter 2 Post (R)</MenuItem>
                    <MenuItem value={FilterRouting.Stereo}>Filter 1 (L) &amp; 2 (R) Post (stereo)</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}