import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { Harmonics } from "../../../model/Modulation";

type FlangerHarmonicsOptionsProps = {
    harmonics: Harmonics
};
type FlangerHarmonicsOptionsEvents = {
    onChange: (value: Harmonics) => void;
};
type FlangerHarmonicsOptionsAllProps = FlangerHarmonicsOptionsProps & FlangerHarmonicsOptionsEvents;

export class FlangerHarmonicsOptions
    extends React.Component<FlangerHarmonicsOptionsAllProps> {

    public constructor(props: FlangerHarmonicsOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Harmonics</Typography>
                <Select value={this.props.harmonics} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={Harmonics.Odd}>Odd (water)</MenuItem>
                    <MenuItem value={Harmonics.Even}>Even (jet)</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}