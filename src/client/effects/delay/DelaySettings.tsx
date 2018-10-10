import * as React from "react";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Grid, Typography } from "@material-ui/core";
import { Delay } from "./Delay";
import { DelayRangeOptions } from "./DelayRangeOptions";
import { DelayRange, RelativeDelay } from "../../../model/Delay";
import { DelayRelativeTimeSlider } from "./DelayRelativeTimeSlider";
import { PercentSlider } from "../PercentSlider";
import { Percent } from "../../../model/Types";
import { ToggleSwitch } from "../ToggleSwitch";

type DelaySettingsProps = {
    delay: Delay;
};
type DelaySettingsActions = ChangeEffects;
type DelaySettingsAllProps = DelaySettingsProps & DelaySettingsActions;

export class DelaySettings extends React.Component<DelaySettingsAllProps> {

    public constructor(props: DelaySettingsAllProps) {
        super(props);
        this.onChangeRange = this.onChangeRange.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeOutput = this.onChangeOutput.bind(this);
        this.onChangeWet = this.onChangeWet.bind(this);
        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onChangeModulation = this.onChangeModulation.bind(this);
        this.onChangeModDepth = this.onChangeModDepth.bind(this);
        this.onChangeModSpeed = this.onChangeModSpeed.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Delay</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <DelayRangeOptions range={this.props.delay.range} onChange={this.onChangeRange} />
                </Grid>
                <Grid item={true} xs={12}>
                    <DelayRelativeTimeSlider 
                        time={this.props.delay.time} 
                        range={this.props.delay.range} 
                        onChange={this.onChangeTime}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Input Level" 
                        value={this.props.delay.inputLevel} 
                        onChange={this.onChangeInput}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Output Level" 
                        value={this.props.delay.outputLevel} 
                        onChange={this.onChangeOutput}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Wet" 
                        value={this.props.delay.wet} 
                        onChange={this.onChangeWet}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Feedback" 
                        value={this.props.delay.feedback} 
                        onChange={this.onChangeFeedback}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch 
                        label="Modulation" 
                        checked={this.props.delay.modulation} 
                        onChange={this.onChangeModulation}
                    />
                </Grid>
                {this.props.delay.modulation && 
                    <Grid item={true} xs={12}>
                        <PercentSlider 
                            label="Modulation Speed" 
                            value={this.props.delay.modSpeed} 
                            onChange={this.onChangeModSpeed}
                        />
                    </Grid>}
                {this.props.delay.modulation &&
                    <Grid item={true} xs={12}>
                        <PercentSlider 
                            label="Modulation Depth" 
                            value={this.props.delay.modDepth} 
                            onChange={this.onChangeModDepth}
                        />
                    </Grid>}
            </Grid>
        );
    }

    private onChangeRange(range: DelayRange) {
        this.props.changeEffects({ delay: { range: range } });
    }

    private onChangeTime(time: RelativeDelay) {
        this.props.changeEffects({ delay: { time: time } });
    }

    private onChangeInput(value: Percent) {
        this.props.changeEffects({ delay: { inputLevel: value } });
    }

    private onChangeOutput(value: Percent) {
        this.props.changeEffects({ delay: { outputLevel: value } });
    }

    private onChangeWet(value: Percent) {
        this.props.changeEffects({ delay: { wet: value } });
    }

    private onChangeFeedback(value: Percent) {
        this.props.changeEffects({ delay: { feedback: value } });
    }

    private onChangeModulation(value: boolean) {
        this.props.changeEffects({ delay: { modulation: value } });
    }

    private onChangeModDepth(value: Percent) {
        this.props.changeEffects({ delay: { modDepth: value } });
    }

    private onChangeModSpeed(value: Percent) {
        this.props.changeEffects({ delay: { modSpeed: value } });
    }
}
