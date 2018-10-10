import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";
import { DistortionLowPass } from "../../../model/Distortion";

type DistortionLowPassOptionsProps = {
    value: DistortionLowPass;
};
type DistortionLowPassOptionsEvents = {
    onChange: (value: DistortionLowPass) => void;
};
type DistortionLowPassOptionsAllProps = DistortionLowPassOptionsProps & DistortionLowPassOptionsEvents;

export class DistortionLowPassOptions
    extends React.Component<DistortionLowPassOptionsAllProps> {

    public constructor(props: DistortionLowPassOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Low-pass Filter</Typography>
                <Select value={this.props.value} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={DistortionLowPass.Low}>Low</MenuItem>
                    <MenuItem value={DistortionLowPass.Mid}>Mid</MenuItem>
                    <MenuItem value={DistortionLowPass.High}>High</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}