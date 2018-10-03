import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { 
    DspDoubleDelay, DoubleDelayDelay, DspDelayFeedback, DspDelayLevel, DspPassFrequency, DspBalance, DoubleDelayDelay3, DoubleDelayDelay4 
} from "../../../model/Dsp";
import { DspDelaySettings } from "./DspDelaySettings";
import { DspBalanceSlider } from "./DspBalanceSlider";
import { DspPassFrequencySlider } from "./DspPassFrequencySlider";

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

        this.onChangeDelay3 = this.onChangeDelay3.bind(this);
        this.onChangeFeedback3 = this.onChangeFeedback3.bind(this);
        this.onChangeLevel3 = this.onChangeLevel3.bind(this);

        this.onChangeDelay4 = this.onChangeDelay4.bind(this);
        this.onChangeFeedback4 = this.onChangeFeedback4.bind(this);
        this.onChangeLevel4 = this.onChangeLevel4.bind(this);

        this.onChangeFilterL = this.onChangeFilterL.bind(this);
        this.onChangeFilterR = this.onChangeFilterR.bind(this);
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
                        label="Left 2nd Delay - Right Feedback (3)"
                        delayMin={100} 
                        delayMax={250}
                        delay={this.props.doubleDelay.delay3} 
                        onChangeDelay={this.onChangeDelay3}
                        onChangeFeedback={this.onChangeFeedback3}
                        onChangeLevel={this.onChangeLevel3}
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
                    <DspDelaySettings 
                        label="Right 2nd Delay - Left Feedback (4)"
                        delayMin={200} 
                        delayMax={500}
                        delay={this.props.doubleDelay.delay4} 
                        onChangeDelay={this.onChangeDelay4}
                        onChangeFeedback={this.onChangeFeedback4}
                        onChangeLevel={this.onChangeLevel4}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspPassFrequencySlider
                        label="Filter Left"
                        value={this.props.doubleDelay.frequencyL} 
                        onChange={this.onChangeFilterL}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspPassFrequencySlider
                        label="Filter Right"
                        value={this.props.doubleDelay.frequencyR} 
                        onChange={this.onChangeFilterR}
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

    private onChangeDelay3(value: DoubleDelayDelay3) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay3: { delay: value } } } });
    }

    private onChangeFeedback3(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay3: { feedback: value } } } });
    }

    private onChangeLevel3(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay3: { level: value } } } });
    }

    private onChangeDelay4(value: DoubleDelayDelay4) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay4: { delay: value } } } });
    }

    private onChangeFeedback4(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay4: { feedback: value } } } });
    }

    private onChangeLevel4(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { delay4: { level: value } } } });
    }
    
    private onChangeFilterL(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { frequencyL: value } } });
    }

    private onChangeFilterR(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { frequencyR: value } } });
    }

    private onChangeLeft(value: DspBalance) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { outL: value } } });
    }

    private onChangeRight(value: DspBalance) {
        this.props.changeEffectsEx({ dsp: { doubleDelay: { outR: value } } });
    }
}
