import * as React from "react";
import { Grid } from "material-ui";

// import ApplicationBar from "./ApplicationBar";
import PresetScreen from "./PresetScreen";

export default class Layout extends React.Component {
    public render() {
        return (
            <Grid container={true} direction="column" wrap="nowrap">
                {/* <Grid item={true} xs={12}>
                    <ApplicationBar />
                </Grid> */}
                <Grid item={true} xs={12}>
                    <PresetScreen />
                </Grid>
            </Grid>
        );
    }
}