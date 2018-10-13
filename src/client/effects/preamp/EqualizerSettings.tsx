import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { AttenuationGainSlider } from "../AttenuationGainSlider";
import { PreEqualizer } from "../../../model/PreAmp";
import { Percent } from "../../../model/Types";

type EqualizerSettingsProps = {
    equalizer: PreEqualizer;
};
type EqualizerSettingsActions = ChangeEffectsEx;
type EqualizerSettingsAllProps = EqualizerSettingsProps & EqualizerSettingsActions;

export class EqualizerSettings extends React.Component<EqualizerSettingsAllProps> {
    constructor(props: EqualizerSettingsAllProps) {
        super(props);
        this.onChangeBand60 = this.onChangeBand60.bind(this);
        this.onChangeBand125 = this.onChangeBand125.bind(this);
        this.onChangeBand250 = this.onChangeBand250.bind(this);
        this.onChangeBand500 = this.onChangeBand500.bind(this);
        this.onChangeBand1000 = this.onChangeBand1000.bind(this);
        this.onChangeBand2000 = this.onChangeBand2000.bind(this);
        this.onChangeBand4000 = this.onChangeBand4000.bind(this);
        this.onChangeBand8000 = this.onChangeBand8000.bind(this);
    }

    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="h5">Pre Amp - Equalizer</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider
                        label="60 Hz"
                        value={this.props.equalizer.band60Hz}
                        onChange={this.onChangeBand60}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="125 Hz" 
                        value={this.props.equalizer.band125Hz} 
                        onChange={this.onChangeBand125} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="250 Hz" 
                        value={this.props.equalizer.band250Hz} 
                        onChange={this.onChangeBand250} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="500 Hz" 
                        value={this.props.equalizer.band500Hz} 
                        onChange={this.onChangeBand500} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="1 kHz" 
                        value={this.props.equalizer.band1000Hz} 
                        onChange={this.onChangeBand1000} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="2 kHz" 
                        value={this.props.equalizer.band2000Hz} 
                        onChange={this.onChangeBand2000} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="4 kHz" 
                        value={this.props.equalizer.band4000Hz} 
                        onChange={this.onChangeBand4000} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="8 kHz" 
                        value={this.props.equalizer.band8000Hz} 
                        onChange={this.onChangeBand8000} 
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeBand60(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band60Hz: value } } });
    }

    private onChangeBand125(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band125Hz: value } } });
    }

    private onChangeBand250(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band250Hz: value } } });
    }

    private onChangeBand500(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band500Hz: value } } });
    }

    private onChangeBand1000(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band1000Hz: value } } });
    }

    private onChangeBand2000(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band2000Hz: value } } });
    }

    private onChangeBand4000(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band4000Hz: value } } });
    }

    private onChangeBand8000(value: Percent): void {
        this.props.changeEffectsEx({ pre: { equalizer: { band8000Hz: value } } });
    }
}