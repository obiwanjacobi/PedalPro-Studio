import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

import { DspTempo, DspFrequency, DspPercent } from "../../../model/Dsp";
import { DspSlider } from "./DspSlider";

interface DspTapsDelay {
        tempo: DspTempo;
        frequency: DspFrequency;
        feedback: DspPercent;
        tap1?: DspPercent;
        tap2?: DspPercent;
        tap3?: DspPercent;
        tap4?: DspPercent;
}        
type DspTapSettingsProps = {
    tap: DspTapsDelay;
};
type DspTapSettingsEvents = {
    onChangeTempo: (tempo: DspTempo) => void;
    onChangeFeedback: (feedback: DspPercent) => void;
    onChangeFilter: (frequency: DspFrequency) => void;
    onChangeTap1?: (level: DspPercent) => void;
    onChangeTap2?: (level: DspPercent) => void;
    onChangeTap3?: (level: DspPercent) => void;
    onChangeTap4?: (level: DspPercent) => void;
};
type DspTapSettingsAllProps = DspTapSettingsProps & DspTapSettingsEvents;
type DspTapSettingsState = {};

export class DspTapSettings extends React.Component<DspTapSettingsAllProps, DspTapSettingsState> {

    public constructor(props: DspTapSettingsAllProps) {
        super(props);
    }
    
    public render() {
        return (
            <Paper elevation={8} square={true} style={{padding: "8px"}}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Tempo" 
                            min={72}
                            max={326}
                            value={this.props.tap.tempo} 
                            onChange={this.props.onChangeTempo}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Frequency"
                            min={401}
                            max={20159}
                            value={this.props.tap.frequency}
                            onChange={this.props.onChangeFilter}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Feedback" 
                            min={0}
                            max={100}
                            value={this.props.tap.feedback} 
                            onChange={this.props.onChangeFeedback}
                        />
                    </Grid>
                    {this.props.tap.tap1 && this.props.onChangeTap1 &&
                        <Grid item={true} xs={12}>
                            <DspSlider
                                label="Tap 1" 
                                min={0}
                                max={100}
                                value={this.props.tap.tap1} 
                                onChange={this.props.onChangeTap1}
                            />
                        </Grid>}
                        {this.props.tap.tap2 && this.props.onChangeTap2 &&
                        <Grid item={true} xs={12}>
                            <DspSlider
                                label="Tap 2" 
                                min={0}
                                max={100}
                                value={this.props.tap.tap2} 
                                onChange={this.props.onChangeTap2}
                            />
                        </Grid>}
                    {this.props.tap.tap3 && this.props.onChangeTap3 &&
                        <Grid item={true} xs={12}>
                            <DspSlider
                                label="Tap 3" 
                                min={0}
                                max={100}
                                value={this.props.tap.tap3} 
                                onChange={this.props.onChangeTap3}
                            />
                        </Grid>}
                    {this.props.tap.tap4 && this.props.onChangeTap4 &&
                        <Grid item={true} xs={12}>
                            <DspSlider
                                label="Tap 4" 
                                min={0}
                                max={100}
                                value={this.props.tap.tap4} 
                                onChange={this.props.onChangeTap4}
                            />
                        </Grid>}
                </Grid>
            </Paper>
        );
    }
}
