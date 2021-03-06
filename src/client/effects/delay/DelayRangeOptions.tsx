import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { DelayRange } from "../../../model/Delay";

type DelayRangeOptionsProps = {
    range: DelayRange
};
type DelayRangeOptionsEvents = {
    onChange: (value: DelayRange) => void;
};
type DelayRangeOptionsAllProps = DelayRangeOptionsProps & DelayRangeOptionsEvents;

export class DelayRangeOptions
    extends React.Component<DelayRangeOptionsAllProps> {

    public constructor(props: DelayRangeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Range</Typography>
                <Select value={this.props.range} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={DelayRange.Short}>Short: 23-99</MenuItem>
                    <MenuItem value={DelayRange.Medium}>Medium: 40-409</MenuItem>
                    <MenuItem value={DelayRange.Long}>Long: 61-614</MenuItem>
                </Select>
                <Typography variant="body2">ms</Typography>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}