import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

import { DspFrequency, DspCustomSpring, DspReverbTime } from "../../../model/Dsp";
import { DspSlider } from "./DspSlider";
import { ChangeEffectsEx } from "../ChangeEffectsAction";

type DspCustomSpringSettingsProps = {
    customSpring?: DspCustomSpring;
};
type DspCustomSpringSettingsActions = ChangeEffectsEx;
type DspCustomSpringSettingsAllProps = DspCustomSpringSettingsProps & DspCustomSpringSettingsActions;
type DspCustomSpringSettingsState = {};

export class DspCustomSpringSettings 
    extends React.Component<DspCustomSpringSettingsAllProps, DspCustomSpringSettingsState> {

    public constructor(props: DspCustomSpringSettingsAllProps) {
        super(props);

        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeLowPassFilter = this.onChangeLowPassFilter.bind(this);
        this.onChangeHighPassFilter = this.onChangeHighPassFilter.bind(this);
    }
    
    public render() {
        if (!this.props.customSpring) { return null; }
        
        return (
            <Paper elevation={8} square={true} style={{padding: "8px"}}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Reverb Time" 
                            min={50}
                            max={127}
                            value={this.props.customSpring.time} 
                            onChange={this.onChangeTime}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Low-pass Frequency"
                            min={98}
                            max={20159}
                            value={this.props.customSpring.lowPassFrequency}
                            onChange={this.onChangeLowPassFilter}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="High-pass Frequency" 
                            min={98}
                            max={20159}
                            value={this.props.customSpring.hiPassFrequency} 
                            onChange={this.onChangeHighPassFilter}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    private onChangeTime(value: DspReverbTime) {
        this.props.changeEffectsEx({ dsp: { customSpring: { time: value }}});
    }

    private onChangeLowPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { customSpring: { lowPassFrequency: value }}});
    }

    private onChangeHighPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { customSpring: { hiPassFrequency: value }}});
    }
}
