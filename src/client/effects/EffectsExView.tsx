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

export class EffectsExView extends React.Component<EffectsExViewAllProps> {
    public render() {
        return (
            <Grid container={true} style={{height: "100%"}}>
                <Grid item={true} xs={4} container={true} direction="column">
                    <EffectsExList effectsEx={this.props.effectsEx} />
                </Grid>
                <Grid 
                    item={true} 
                    xs={8} 
                    container={true} 
                    direction="column" 
                    style={{overflowY: "scroll", overflowX: "hidden", padding: "16px"}}
                >
                    <EffectsExSettings />
                </Grid>
            </Grid>
        );
    }
}