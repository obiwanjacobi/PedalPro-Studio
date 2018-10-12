import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

import { EffectsOrEx } from "./Effects";
import { ChangeEffects } from "./ChangeEffectsAction";
import { AmpSwitchesSettings } from "./auxRouting/AmpSwitchesSettings";
import { MidiSettings } from "./midi/MidiSettings";
import { TapTempoSettings } from "./tap/TapTempoSettings";

type EffectsControlSettingsProps = {
    effects?: EffectsOrEx;
};
type EffectsControlSettingsActions = ChangeEffects;
type EffectsControlSettingsAllProps = EffectsControlSettingsProps & EffectsControlSettingsActions;

export class EffectsControlSettings extends React.Component<EffectsControlSettingsAllProps> {
    public render() {
        if (!this.props.effects) { return null; }

        return (
            <Grid 
                container={true} 
                direction="column" 
                style={{overflowX: "hidden", overflowY: "scroll", padding: "16px", width: "300px", flexWrap: "nowrap"}}
            >
                <Grid item={true} xs={12}>
                    <Paper elevation={8} square={true} style={{ padding: "8px", margin: "8px"}}>
                        <TapTempoSettings tap={this.effects.tap} changeEffects={this.props.changeEffects} />
                    </Paper>
                </Grid>
                <Grid item={true} xs={12}>
                    <Paper elevation={8} square={true} style={{ padding: "8px", margin: "8px"}}>
                        <MidiSettings midi={this.effects.midi} changeEffects={this.props.changeEffects} />
                    </Paper>
                </Grid>
                <Grid item={true} xs={12}>
                    <Paper elevation={8} square={true} style={{ padding: "8px", margin: "8px"}}>
                        <AmpSwitchesSettings aux={this.effects.aux} changeEffects={this.props.changeEffects} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }

    private get effects(): EffectsOrEx {
        if (this.props.effects) {
            return this.props.effects;
        }
        throw new Error("Effects is not set.");
    }
}
