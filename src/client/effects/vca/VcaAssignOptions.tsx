import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { VcaAssign } from "../../../model/VoltageControlledAmp";

type VcaAssignOptionsProps = {
    assign: VcaAssign
};
type VcaAssignOptionsEvents = {
    onChange: (value: VcaAssign) => void;
};
type VcaAssignOptionsAllProps = VcaAssignOptionsProps & VcaAssignOptionsEvents;

export class VcaAssignOptions extends React.Component<VcaAssignOptionsAllProps> {

    public constructor(props: VcaAssignOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography variant="body2">Mode</Typography>
                <Select value={this.props.assign} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={VcaAssign.Tremolo}>Tremolo</MenuItem>
                    <MenuItem value={VcaAssign.Panner}>Panner</MenuItem>
                    <MenuItem value={VcaAssign.PannerExpression}>Panner Expression</MenuItem>
                    <MenuItem value={VcaAssign.VolumeExpression}>Volume Expression</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}