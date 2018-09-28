import * as React from "react";

import { Filter2Type } from "../../../model/Filters";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

type Filter2TypeOptionsProps = {
    type: Filter2Type;
};
type Filter2TypeOptionsEvents = {
    onChange: (value: Filter2Type) => void;
};
type Filter2TypeOptionsAllProps = Filter2TypeOptionsProps & Filter2TypeOptionsEvents;
type Filter2TypeOptionsState = {};

export class Filter2TypeOptions
    extends React.Component<Filter2TypeOptionsAllProps, Filter2TypeOptionsState> {

    public constructor(props: Filter2TypeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} spacing={8} direction="row" alignItems="center">
                <Typography>Type</Typography>
                <Select value={this.props.type} onChange={this.onChange} style={{ marginLeft: "8px"}}>
                    <MenuItem value={Filter2Type.LowPass}>Low Pass</MenuItem>
                    <MenuItem value={Filter2Type.BandPass}>Band Pass</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}