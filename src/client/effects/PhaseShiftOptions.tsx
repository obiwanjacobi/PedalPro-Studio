import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { PhaseShift } from "../../model/Types";

type PhaseShiftOptionsProps = {
    phase: PhaseShift
};
type PhaseShiftOptionsEvents = {
    onChange: (value: PhaseShift) => void;
};
type PhaseShiftOptionsAllProps = PhaseShiftOptionsProps & PhaseShiftOptionsEvents;
type PhaseShiftOptionsState = {};

export class PhaseShiftOptions
    extends React.Component<PhaseShiftOptionsAllProps, PhaseShiftOptionsState> {

    public constructor(props: PhaseShiftOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} spacing={8} direction="row" alignItems="center">
                <Typography>Phase</Typography>
                <Select value={this.props.phase} onChange={this.onChange} style={{ marginLeft: "8px"}}>
                    <MenuItem value={PhaseShift.Degrees0}>0</MenuItem>
                    <MenuItem value={PhaseShift.Degrees90}>90</MenuItem>
                    <MenuItem value={PhaseShift.Degrees180}>180</MenuItem>
                    <MenuItem value={PhaseShift.Degrees270}>270</MenuItem>
                </Select>
                <Typography>degrees</Typography>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}