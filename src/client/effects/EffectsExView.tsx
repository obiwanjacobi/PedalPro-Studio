import * as React from "react";
import {
    Grid
} from "@material-ui/core";

import { EffectsEx } from "../../model/Effects";
import { EffectsExList } from "./EffectsExList";

type EffectsExViewProps = {
    effectsEx: EffectsEx;
};
type EffectsExViewAllProps = EffectsExViewProps;
type EffectsExViewState = {};

export class EffectsExView extends React.Component<EffectsExViewAllProps, EffectsExViewState> {
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={4}>
                    <EffectsExList effectsEx={this.props.effectsEx} />
                </Grid>
                <Grid item={true} xs={8}>
                    Effects specific settings here...
                </Grid>
            </Grid>
        );
    }
}