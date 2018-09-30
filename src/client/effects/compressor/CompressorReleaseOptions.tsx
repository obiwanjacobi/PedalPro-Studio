import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";
import { CompressorReleaseTime } from "../../../model/Compressor";

type CompressorReleaseOptionsProps = {
    release: CompressorReleaseTime;
};
type CompressorReleaseOptionsEvents = {
    onChange: (value: CompressorReleaseTime) => void;
};
type CompressorReleaseOptionsAllProps = CompressorReleaseOptionsProps & CompressorReleaseOptionsEvents;
type CompressorReleaseOptionsState = {};

export class CompressorReleaseOptions
    extends React.Component<CompressorReleaseOptionsAllProps, CompressorReleaseOptionsState> {

    public constructor(props: CompressorReleaseOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Release</Typography>
                <Select value={this.props.release} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={CompressorReleaseTime.ms100}>0.1</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms200}>0.2</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms300}>0.3</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms500}>0.5</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms700}>0.7</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms800}>0.8</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms1000}>1.0</MenuItem>
                    <MenuItem value={CompressorReleaseTime.ms1800}>1.8</MenuItem>
                </Select>
                <Typography>seconds</Typography>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}