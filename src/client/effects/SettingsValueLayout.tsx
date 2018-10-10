import * as React from "react";
import { Typography, Grid } from "@material-ui/core";

type SettingsValueLayoutProps = {
    formattedValue: string;
    unit: string;
    label: string;
    control: React.ReactNode;
};

export class SettingsValueLayout extends React.Component<SettingsValueLayoutProps> {
    
    public render() {
        return (
            <div>
                <div>
                    <Typography>{this.props.label}</Typography>
                </div>
                <div>
                    {this.props.control}
                </div>
                <div style={{marginLeft: "auto", marginRight: "12px", textAlign: "right"}}>
                    <Typography color="secondary" style={{display: "inline", marginRight: "8px"}}>
                        {this.props.formattedValue}
                    </Typography>
                    <Typography style={{display: "inline"}}>{this.props.unit}</Typography>
                </div>
            </div>
        );
    }

    public _render() {
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