import * as React from "react";
import { MenuItem, Select, Typography, Grid } from "@material-ui/core";

import { TapTempoDivision } from "../../../model/TapTempo";

type TapTempoDivisionOptionsProps = {
    label: string;
    division: TapTempoDivision
};
type TapTempoDivisionOptionsEvents = {
    onChange: (value: TapTempoDivision) => void;
};
type TapTempoDivisionOptionsAllProps = TapTempoDivisionOptionsProps & TapTempoDivisionOptionsEvents;

export class TapTempoDivisionOptions
    extends React.Component<TapTempoDivisionOptionsAllProps> {

    public constructor(props: TapTempoDivisionOptionsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <Grid container={true} alignItems="center">
                <Typography>{this.props.label}</Typography>
                <Select value={this.props.division} onChange={this.onChange} style={{ margin: "8px"}}>
                    <MenuItem value={TapTempoDivision.Quarter}>1/4</MenuItem>
                    <MenuItem value={TapTempoDivision.Eighth}>1/8</MenuItem>
                    <MenuItem value={TapTempoDivision.DotEighth}>.1/8</MenuItem>
                </Select>
            </Grid>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(Number(event.target.value));
    }
}