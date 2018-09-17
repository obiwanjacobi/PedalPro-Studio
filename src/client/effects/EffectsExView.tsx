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
            <Grid container={true}>
                <Grid item={true} container={true} direction="column" xs={4}>
                    <EffectsExList effectsEx={this.props.effectsEx} />
                </Grid>
                <Grid item={true} container={true} xs={8}>
                    <EffectsExSettings />
                </Grid>
            </Grid>
        );
    }
}