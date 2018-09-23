import * as React from "react";

import { EmphasisResonance } from "../../../model/PreAmp";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

type EmphasisResonanceOptionsProps = {
    resonance: EmphasisResonance
};
type EmphasisResonanceOptionsEvents = {
    onChange: (value: EmphasisResonance) => void;
};
type EmphasisResonanceOptionsAllProps = EmphasisResonanceOptionsProps & EmphasisResonanceOptionsEvents;
type EmphasisResonanceOptionsState = {};

export class EmphasisResonanceOptions
    extends React.Component<EmphasisResonanceOptionsAllProps, EmphasisResonanceOptionsState> {

    public constructor(props: EmphasisResonanceOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} spacing={8} direction="row">
                <Typography>Resonance</Typography>
                <Select value={this.props.resonance} onChange={this.onChange} style={{ marginLeft: "8px"}}>
                    <MenuItem value={EmphasisResonance.Low}>Low</MenuItem>
                    <MenuItem value={EmphasisResonance.MidLow}>Mid-Low</MenuItem>
                    <MenuItem value={EmphasisResonance.MidHigh}>Mid-High</MenuItem>
                    <MenuItem value={EmphasisResonance.High}>High</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}