import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";
import { CompressorAttackTime } from "../../../model/Compressor";

type CompressorAttackOptionsProps = {
    attack: CompressorAttackTime;
};
type CompressorAttackOptionsEvents = {
    onChange: (value: CompressorAttackTime) => void;
};
type CompressorAttackOptionsAllProps = CompressorAttackOptionsProps & CompressorAttackOptionsEvents;
type CompressorAttackOptionsState = {};

export class CompressorAttackOptions
    extends React.Component<CompressorAttackOptionsAllProps, CompressorAttackOptionsState> {

    public constructor(props: CompressorAttackOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Attack</Typography>
                <Select value={this.props.attack} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={CompressorAttackTime.ms3}>3</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms8}>8</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms13}>13</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms22}>22</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms31}>31</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms40}>40</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms57}>57</MenuItem>
                    <MenuItem value={CompressorAttackTime.ms80}>80</MenuItem>
                </Select>
                <Typography>ms</Typography>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}