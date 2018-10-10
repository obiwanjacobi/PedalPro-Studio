import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { EnvelopeFunction } from "../../../model/Filters";

type EnvelopeFunctionOptionsProps = {
    function: EnvelopeFunction
};
type EnvelopeFunctionOptionsEvents = {
    onChange: (value: EnvelopeFunction) => void;
};
type EnvelopeFunctionOptionsAllProps = EnvelopeFunctionOptionsProps & EnvelopeFunctionOptionsEvents;

export class EnvelopeFunctionOptions extends React.Component<EnvelopeFunctionOptionsAllProps> {

    public constructor(props: EnvelopeFunctionOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Function</Typography>
                <Select value={this.props.function} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={EnvelopeFunction.Linear}>Linear</MenuItem>
                    <MenuItem value={EnvelopeFunction.ExponentialPos}>Exponential Pos.</MenuItem>
                    <MenuItem value={EnvelopeFunction.ExponentialNeg}>Exponential Neg.</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}