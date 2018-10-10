import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { FilterWaveForm } from "../../../model/Filters";

type FilterWaveFromOptionsProps = {
    wave: FilterWaveForm
};
type FilterWaveFromOptionsEvents = {
    onChange: (value: FilterWaveForm) => void;
};
type FilterWaveFromOptionsAllProps = FilterWaveFromOptionsProps & FilterWaveFromOptionsEvents;

export class FilterWaveFromOptions extends React.Component<FilterWaveFromOptionsAllProps> {

    public constructor(props: FilterWaveFromOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Mode</Typography>
                <Select value={this.props.wave} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={FilterWaveForm.Sine}>Sine</MenuItem>
                    <MenuItem value={FilterWaveForm.Triangle}>Triangle</MenuItem>
                    <MenuItem value={FilterWaveForm.Trapezoidal}>Trapeziodal</MenuItem>
                    <MenuItem value={FilterWaveForm.Rectangle}>Rectangle</MenuItem>
                    <MenuItem value={FilterWaveForm.Exponential}>Exponential</MenuItem>
                    <MenuItem value={FilterWaveForm.Shelf1}>Shelf 1</MenuItem>
                    <MenuItem value={FilterWaveForm.Shelf2}>Shelf 2</MenuItem>
                    <MenuItem value={FilterWaveForm.Shelf3}>Shelf 3</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}