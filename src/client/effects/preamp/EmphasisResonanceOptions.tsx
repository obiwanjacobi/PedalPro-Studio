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

export class EmphasisResonanceOptions extends React.Component<EmphasisResonanceOptionsAllProps> {

    public constructor(props: EmphasisResonanceOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Resonance</Typography>
                <Select value={this.props.resonance} onChange={this.onChange} style={{ margin: "8px"}}>
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