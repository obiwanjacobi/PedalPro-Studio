import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { ModulationWaveForm } from "../../../model/Modulation";

type ModulationWaveFormOptionsProps = {
    wave: ModulationWaveForm
};
type ModulationWaveFormOptionsEvents = {
    onChange: (value: ModulationWaveForm) => void;
};
type ModulationWaveFormOptionsAllProps = ModulationWaveFormOptionsProps & ModulationWaveFormOptionsEvents;

export class ModulationWaveFormOptions
    extends React.Component<ModulationWaveFormOptionsAllProps> {

    public constructor(props: ModulationWaveFormOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Wave</Typography>
                <Select value={this.props.wave} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={ModulationWaveForm.Sine}>Sine</MenuItem>
                    <MenuItem value={ModulationWaveForm.Triangle}>Triangle</MenuItem>
                    <MenuItem value={ModulationWaveForm.Trapezoidal}>Trapezoidal</MenuItem>
                    <MenuItem value={ModulationWaveForm.Rectangle}>Rectangle</MenuItem>
                    <MenuItem value={ModulationWaveForm.Exponential}>Exponential</MenuItem>
                    <MenuItem value={ModulationWaveForm.Shelf1}>Shelf 1</MenuItem>
                    <MenuItem value={ModulationWaveForm.Shelf2}>Shelf 2</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}