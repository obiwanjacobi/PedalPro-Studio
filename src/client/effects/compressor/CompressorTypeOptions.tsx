import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";
import { CompressorModelType } from "../../../model/Compressor";

type CompressorTypeOptionsProps = {
    type: CompressorModelType;
};
type CompressorTypeOptionsEvents = {
    onChange: (value: CompressorModelType) => void;
};
type CompressorTypeOptionsAllProps = CompressorTypeOptionsProps & CompressorTypeOptionsEvents;
type CompressorTypeOptionsState = {};

export class CompressorTypeOptions
    extends React.Component<CompressorTypeOptionsAllProps, CompressorTypeOptionsState> {

    public constructor(props: CompressorTypeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Type</Typography>
                <Select value={this.props.type} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={CompressorModelType.TubeGen}>Tube Compression</MenuItem>
                    <MenuItem value={CompressorModelType.VariMu}>Tube Sustain</MenuItem>
                    <MenuItem value={CompressorModelType.Limiter}>Limiter</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}