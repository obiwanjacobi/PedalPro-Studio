import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { 
    DspDoubleDelay, DoubleDelayDelay, DspDelayFeedback, DspDelayLevel, DspPassFrequency, DspBalance 
} from "../../../model/Dsp";
import { DspDelaySettings } from "./DspDelaySettings";
import { DspBalanceSlider } from "./DspBalanceSlider";

type DspDoubleDelaySettingsProps = {
    doubleDelay?: DspDoubleDelay;
};
type DspDoubleDelaySettingsActions = ChangeEffectsEx;
type DspDoubleDelaySettingsAllProps = DspDoubleDelaySettingsProps & DspDoubleDelaySettingsActions;
type DspDoubleDelaySettingsState = {};

export class DspDoubleDelaySettings 
    extends React.Component<DspDoubleDelaySettingsAllProps, DspDoubleDelaySettingsState> {

    public constructor(props: DspDoubleDelaySettingsAllProps) {
        super(props);

        this.onChangeDelay1 = this.onChangeDelay1.bind(this);
        this.onChangeFeedback1 = this.onChangeFeedback1.bind(this);
        this.onChangeLevel1 = this.onChangeLevel1.bind(this);
        this.onChangeFilter1 = this.onChangeFilter1.bind(this);
        
        this.onChangeDelay2 = this.onChangeDelay2.bind(this);
        this.onChangeFeedback2 = this.onChangeFeedback2.bind(this);
        this.onChangeLevel2 = this.onChangeLevel2.bind(this);
        this.onChangeFilter2 = this.onChangeFilter2.bind(this);

        this.onChangeLeft = this.onChangeLeft.bind(this);
        this.onChangeRight = this.onChangeRight.bind(this);
    }
    
    public render() {
        if (!this.props.doubleDelay) { return null; }

        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <DspDelaySettings 
                        label="Left Delay (1)"
                        delayMin={10} 
                        delayMax={40}
                        delay={this.props.doubleDelay.delay1} 
                        filter={this.props.doubleDelay.frequency1}
                        onChangeDelay={this.onChangeDelay1}
                        onChangeFeedback={this.onChangeFeedback1}
                        onChangeLevel={this.onChangeLevel1}
                        onChangeFilter={this.onChangeFilter1}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspDelaySettings 
                        label="Right Delay (2)"
                        delayMin={10} 
                        delayMax={40}
                        delay={this.props.doubleDelay.delay2} 
                        filter={this.props.doubleDelay.frequency2}
                        onChangeDelay={this.onChangeDelay2}
                        onChangeFeedback={this.onChangeFeedback2}
                        onChangeLevel={this.onChangeLevel2}
                        onChangeFilter={this.onChangeFilter2}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspBalanceSlider 
                        maxLabel="Left" 
                        minLabel="Right"
                        value={this.props.doubleDelay.outL} 
                        onChange={this.onChangeLeft}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspBalanceSlider 
                        maxLabel="Right" 
                        minLabel="Left"
                        value={this.props.doubleDelay.outR} 
                        onChange={this.onChangeRight}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeDelay1(value: DoubleDelayDelay) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay1: { delay: value } } } });
    }

    private onChangeFeedback1(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay1: { feedback: value } } } });
    }

    private onChangeLevel1(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay1: { level: value } } } });
    }

    private onChangeFilter1(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { frequency1: value  } } });
    }

    private onChangeDelay2(value: DoubleDelayDelay) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay2: { delay: value } } } });
    }

    private onChangeFeedback2(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay2: { feedback: value } } } });
    }

    private onChangeLevel2(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay2: { level: value } } } });
    }

    private onChangeFilter2(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { frequency2: value  } } });
    }

    private onChangeLeft(value: DspBalance) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { outL: value } } });
    }

    private onChangeRight(value: DspBalance) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { outR: value } } });
    }
}
