import * as React from "react";
import { Grid } from "@material-ui/core";

export class SignalPathMono extends React.Component {
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={5} />
                <Grid item={true} xs={2} />
                <Grid item={true} xs={5} />
            </Grid>
        );
    }
}