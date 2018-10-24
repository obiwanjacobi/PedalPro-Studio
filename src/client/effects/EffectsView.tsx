import * as React from "react";
import { Grid } from "@material-ui/core";

import { Effects } from "./Effects";
import EffectsList from "./EffectsList";
import EffectsSettings from "./EffectsSettings";

type EffectsViewProps = {
    effects: Effects;
    origin: Effects;
};
type EffectsViewAllProps = EffectsViewProps;

export class EffectsView extends React.Component<EffectsViewAllProps> {
    public render() {
        return (
            <Grid container={true} style={{ height: "100%" }}>
                <Grid item={true} xs={4} container={true} direction="column">
                    <EffectsList effects={this.props.effects} origin={this.props.origin} />
                </Grid>
                <Grid
                    item={true}
                    xs={8}
                    container={true}
                    direction="column"
                    style={{ overflowY: "scroll", overflowX: "hidden", padding: "16px" }}
                >
                    <EffectsSettings />
                </Grid>
            </Grid>
        );
    }
}