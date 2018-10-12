import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { ModulationMode } from "../../../model/Modulation";

type ModulationModeOptionsProps = {
    mode: ModulationMode
};
type ModulationModeOptionsEvents = {
    onChange: (value: ModulationMode) => void;
};
type ModulationModeOptionsAllProps = ModulationModeOptionsProps & ModulationModeOptionsEvents;

export class ModulationModeOptions
    extends React.Component<ModulationModeOptionsAllProps> {

    public constructor(props: ModulationModeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Modulation Mode</Typography>
                <Select value={this.props.mode} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={ModulationMode.None}>None</MenuItem>
                    <MenuItem value={ModulationMode.Chorus}>Chorus</MenuItem>
                    <MenuItem value={ModulationMode.Flanger}>Flanger</MenuItem>
                    <MenuItem value={ModulationMode.ChorusVibe}>Vibe</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}