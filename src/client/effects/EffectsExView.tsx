import * as React from "react";
import {
    Grid
} from "@material-ui/core";

import { EffectsEx } from "./Effects";
import EffectsExList from "./EffectsExList";
import EffectsExSettings from "./EffectsExSettings";

type EffectsExViewProps = {
    effectsEx: EffectsEx;
};
type EffectsExViewAllProps = EffectsExViewProps;
type EffectsExViewState = {};

export class EffectsExView extends React.Component<EffectsExViewAllProps, EffectsExViewState> {
    public render() {
        return (
            <Grid container={true} style={{height: "100%"}}>
                <Grid item={true} xs={4} container={true} direction="column">
                    <EffectsExList effectsEx={this.props.effectsEx} />
                </Grid>
                <Grid item={true} xs={7}>
                    <div style={{margin: "8px"}}>
                        <EffectsExSettings />
                    </div>
                </Grid>
            </Grid>
        );
    }
}