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
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="body2">{this.props.label}</Typography>
                </Grid>
                <Grid item={true} xs={12} style={{padding: "16px"}}>
                    {this.props.control}
                </Grid>
                <Grid item={true} xs={12}>
                    <div style={{marginLeft: "auto", marginRight: "12px", textAlign: "right"}}>
                        <Typography variant="body2" color="secondary" style={{display: "inline", marginRight: "8px"}}>
                            {this.props.formattedValue}
                        </Typography>
                        <Typography variant="body2" style={{display: "inline"}}>{this.props.unit}</Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}