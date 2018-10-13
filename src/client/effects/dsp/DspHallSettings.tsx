import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

import { DspFrequency, DspHall, DspDelayTime, DspReverbTime2 } from "../../../model/Dsp";
import { DspSlider } from "./DspSlider";
import { ChangeEffectsEx } from "../ChangeEffectsAction";

type DspHallSettingsProps = {
    hall?: DspHall;
};
type DspHallSettingsActions = ChangeEffectsEx;
type DspHallSettingsAllProps = DspHallSettingsProps & DspHallSettingsActions;

export class DspHallSettings 
    extends React.Component<DspHallSettingsAllProps> {

    public constructor(props: DspHallSettingsAllProps) {
        super(props);

        this.onChangePreDelay = this.onChangePreDelay.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeLowPassFilter = this.onChangeLowPassFilter.bind(this);
        this.onChangeHighPassFilter = this.onChangeHighPassFilter.bind(this);
    }
    
    public render() {
        if (!this.props.hall) { return null; }
        
        return (
            <Paper elevation={8} square={true} style={{padding: "8px"}}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Pre Delay" 
                            min={20}
                            max={100}
                            value={this.props.hall.preDelayTime} 
                            onChange={this.onChangePreDelay}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Reverb Time" 
                            min={20}
                            max={127}
                            value={this.props.hall.reverbTime} 
                            onChange={this.onChangeTime}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Low-pass Frequency"
                            unit="Hz"
                            min={98}
                            max={20159}
                            value={this.props.hall.lowPassFrequency}
                            onChange={this.onChangeLowPassFilter}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="High-pass Frequency" 
                            unit="Hz"
                            min={98}
                            max={20159}
                            value={this.props.hall.hiPassFrequency} 
                            onChange={this.onChangeHighPassFilter}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    private onChangePreDelay(value: DspDelayTime) {
        this.props.changeEffectsEx({ dsp: { hall: { preDelayTime: value }}});
    }

    private onChangeTime(value: DspReverbTime2) {
        this.props.changeEffectsEx({ dsp: { hall: { reverbTime: value }}});
    }

    private onChangeLowPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { hall: { lowPassFrequency: value }}});
    }

    private onChangeHighPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { hall: { hiPassFrequency: value }}});
    }
}
