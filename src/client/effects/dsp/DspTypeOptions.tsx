import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { DspType } from "../../../model/Dsp";

type DspTypeOptionsProps = {
    type: DspType;
};
type DspTypeOptionsEvents = {
    onChange: (value: DspType) => void;
};
type DspTypeOptionsAllProps = DspTypeOptionsProps & DspTypeOptionsEvents;

export class DspTypeOptions extends React.Component<DspTypeOptionsAllProps> {

    public constructor(props: DspTypeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Mode</Typography>
                <Select value={this.props.type} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={DspType.MedHall}>Medium Hall</MenuItem>
                    <MenuItem value={DspType.BigHall}>Big Hall</MenuItem>
                    <MenuItem value={DspType.Room}>Room</MenuItem>
                    <MenuItem value={DspType.Church}>Church</MenuItem>
                    <MenuItem value={DspType.Reverse}>Reverse</MenuItem>
                    <MenuItem value={DspType.Gated}>Gated</MenuItem>
                    <MenuItem value={DspType.Chapel}>Chapel</MenuItem>
                    <MenuItem value={DspType.Spring}>Spring</MenuItem>
                    <MenuItem value={DspType.DoubleDelay}>Double Delay</MenuItem>
                    <MenuItem value={DspType.CaveDelay}>Cave Delay</MenuItem>
                    <MenuItem value={DspType.SingleTap}>Single Tap</MenuItem>
                    <MenuItem value={DspType.FourTapsDelay}>Four Taps Delay</MenuItem>
                    <MenuItem value={DspType.TripleDelay}>Triple Delay</MenuItem>
                    <MenuItem value={DspType.Plate}>Plate Reverb</MenuItem>
                    <MenuItem value={DspType.CustomSpring}>Spring Reverb</MenuItem>
                    <MenuItem value={DspType.Hall}>Hall Reverb</MenuItem>
                    <MenuItem value={DspType.FreeVerb}>Free Reverb</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}