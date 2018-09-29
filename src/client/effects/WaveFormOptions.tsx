import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { WaveForm } from "../../model/Types";

type WaveFormOptionsProps = {
    wave: WaveForm
};
type WaveFormOptionsEvents = {
    onChange: (value: WaveForm) => void;
};
type WaveFormOptionsAllProps = WaveFormOptionsProps & WaveFormOptionsEvents;
type WaveFormOptionsState = {};

export class WaveFormOptions
    extends React.Component<WaveFormOptionsAllProps, WaveFormOptionsState> {

    public constructor(props: WaveFormOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} spacing={8} direction="row" alignItems="center">
                <Typography>Wave</Typography>
                <Select value={this.props.wave} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={WaveForm.Sine}>Sine</MenuItem>
                    <MenuItem value={WaveForm.Triangle}>Triangle</MenuItem>
                    <MenuItem value={WaveForm.Trapezoidal}>Trapezoidal</MenuItem>
                    <MenuItem value={WaveForm.Rectangle}>Rectangle</MenuItem>
                    <MenuItem value={WaveForm.PCal}>Phase Calibrated</MenuItem>
                    <MenuItem value={WaveForm.Shelf}>Shelf</MenuItem>
                    <MenuItem value={WaveForm.Vintage}>Vintage</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}