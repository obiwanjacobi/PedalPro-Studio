import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Midi } from "./Midi";
import { ChangeEffects } from "../ChangeEffectsAction";
import { MidiRouting } from "../../../model/Midi";
import { FilterRouting } from "../../../model/Filters";
import { FilterRoutingOptions } from "../filters/FilterRoutingOptions";
import { ModulationMode } from "../../../model/Modulation";
import { ModulationModeOptions } from "../modulation/ModulationModeOptions";
import { DelayRoutingOptions } from "../delay/DelayRoutingOptions";
import { DelayRouting } from "../../../model/Delay";
import { AuxRoutingOptions } from "../auxRouting/AuxRoutingOptions";
import { AuxRouting } from "../../../model/AuxRouting";

type MidiSettingsProps = {
    midi: Midi;
};
type MidiSettingsActions = ChangeEffects;
type MidiSettingsAllProps = MidiSettingsProps & MidiSettingsActions;

export class MidiSettings extends React.Component<MidiSettingsAllProps> {

    public constructor(props: MidiSettingsAllProps) {
        super(props);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeModulation = this.onChangeModulation.bind(this);
        this.onChangeDelay = this.onChangeDelay.bind(this);
        this.onChangeAux = this.onChangeAux.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Midi Routing</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FilterRoutingOptions routing={this.routing.filter} onChange={this.onChangeFilter} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ModulationModeOptions mode={this.routing.modulation} onChange={this.onChangeModulation} />
                </Grid>
                <Grid item={true} xs={12}>
                    <DelayRoutingOptions routing={this.routing.delay} onChange={this.onChangeDelay} />
                </Grid>
                <Grid item={true} xs={12}>
                    <AuxRoutingOptions routing={this.routing.aux} onChange={this.onChangeAux} />
                </Grid>
            </Grid>
        );
    }

    private get routing(): MidiRouting {
        return this.props.midi.routing;
    }

    private onChangeFilter(value: FilterRouting) {
        this.props.changeEffects({ midi: { routing: { filter: value } } });
    }

    private onChangeModulation(value: ModulationMode) {
        this.props.changeEffects({ midi: { routing: { modulation: value } } });
    }

    private onChangeDelay(value: DelayRouting) {
        this.props.changeEffects({ midi: { routing: { delay: value } } });
    }

    private onChangeAux(value: AuxRouting) {
        this.props.changeEffects({ midi: { routing: { aux: value } } });
    }
}
