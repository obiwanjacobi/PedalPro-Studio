import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { TapTempoMode } from "../../../model/TapTempo";

type TapTempoModeOptionsProps = {
    mode: TapTempoMode
};
type TapTempoModeOptionsEvents = {
    onChange: (value: TapTempoMode) => void;
};
type TapTempoModeOptionsAllProps = TapTempoModeOptionsProps & TapTempoModeOptionsEvents;

export class TapTempoModeOptions
    extends React.Component<TapTempoModeOptionsAllProps> {

    public constructor(props: TapTempoModeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Tap Tempo Mode</Typography>
                <Select value={this.props.mode} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={TapTempoMode.None}>Off</MenuItem>
                    <MenuItem value={TapTempoMode.Master}>Master</MenuItem>
                    <MenuItem value={TapTempoMode.Delay}>Delay</MenuItem>
                    <MenuItem value={TapTempoMode.Tremolo}>Tremolo (Vca)</MenuItem>
                    <MenuItem value={TapTempoMode.Filters}>Filters</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}