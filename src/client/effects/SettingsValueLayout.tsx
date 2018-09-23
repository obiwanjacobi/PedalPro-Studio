import * as React from "react";
import { Typography, Grid } from "@material-ui/core";

type SettingsValueLayoutProps = {
    formattedValue: string;
    unit: string;
    label: string;
    control: React.ReactNode;
};
type SettingsValueLayoutState = {};

export class SettingsValueLayout extends React.Component<SettingsValueLayoutProps, SettingsValueLayoutState> {
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography>{this.props.label}</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    {this.props.control}
                </Grid>
                <Grid item={true} xs={10} />
                <Grid item={true} xs={1}>
                    <Typography color="secondary">{this.props.formattedValue}</Typography>
                </Grid>
                <Grid item={true} xs={1}>
                    <Typography>{this.props.unit}</Typography>
                </Grid>
            </Grid>
        );
    }
}