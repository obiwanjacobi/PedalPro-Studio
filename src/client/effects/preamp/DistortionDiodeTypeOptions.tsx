import * as React from "react";

import { DistortionDiodeType, DistortionDiodeTypeValue } from "../../../model/PreAmp";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

type DistortionDiodeTypeOptionsProps = {
    type: DistortionDiodeType
};
type DistortionDiodeTypeOptionsEvents = {
    onChange: (value: DistortionDiodeType) => void;
};
type DistortionDiodeTypeOptionsAllProps = DistortionDiodeTypeOptionsProps & DistortionDiodeTypeOptionsEvents;
type DistortionDiodeTypeOptionsState = {};

export class DistortionDiodeTypeOptions
    extends React.Component<DistortionDiodeTypeOptionsAllProps, DistortionDiodeTypeOptionsState> {

    public constructor(props: DistortionDiodeTypeOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>Type</Typography>
                <Select value={this.props.type} onChange={this.onChange} style={{ margin: "8px"}}>
                    {this.renderMenuItem(DistortionDiodeType.Guvnor)}
                    {this.renderMenuItem(DistortionDiodeType.DumbleDrive)}
                    {this.renderMenuItem(DistortionDiodeType.VrDistortion1)}
                    {this.renderMenuItem(DistortionDiodeType.FullDrive)}
                    {this.renderMenuItem(DistortionDiodeType.BrightDistortion)}
                    {this.renderMenuItem(DistortionDiodeType.VintageDrive)}
                    {this.renderMenuItem(DistortionDiodeType.Mxr)}
                </Select>
            </Grid>
        );
    }

    private renderMenuItem(type: DistortionDiodeType): React.ReactNode {
        return (
            <MenuItem value={type}>
                {DistortionDiodeTypeValue[type]}
            </MenuItem>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}