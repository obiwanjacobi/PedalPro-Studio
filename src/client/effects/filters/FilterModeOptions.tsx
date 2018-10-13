import * as React from "react";

import { FilterMode } from "../../../model/Filters";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

type FilterModeOptionsProps = {
    mode: FilterMode
};
type FilterModeOptionsEvents = {
    onChange: (value: FilterMode) => void;
};
type FilterModeOptionsAllProps = FilterModeOptionsProps & FilterModeOptionsEvents;

export class FilterModeOptions extends React.Component<FilterModeOptionsAllProps> {

    public constructor(props: FilterModeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Mode</Typography>
                <Select value={this.props.mode} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={FilterMode.Auto}>Auto</MenuItem>
                    <MenuItem value={FilterMode.Equalizer}>Equalizer</MenuItem>
                    <MenuItem value={FilterMode.EnvelopePos}>Envelope Pos.</MenuItem>
                    <MenuItem value={FilterMode.EnvelopeNeg}>Envelope Neg.</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}