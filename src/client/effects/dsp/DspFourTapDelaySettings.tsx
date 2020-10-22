import * as React from "react";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { DspPercent, DspTempo, DspFrequency, DspFourTapsDelay } from "../../../model/Dsp";
import { DspTapSettings } from "./DspTapSettings";

type DspFourTapDelaySettingsProps = {
    fourTap?: DspFourTapsDelay;
};
type DspFourTapDelaySettingsActions = ChangeEffectsEx;
type DspFourTapDelaySettingsAllProps = DspFourTapDelaySettingsProps & DspFourTapDelaySettingsActions;

export class DspFourTapDelaySettings 
    extends React.Component<DspFourTapDelaySettingsAllProps> {

    public constructor(props: DspFourTapDelaySettingsAllProps) {
        super(props);

        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeTap1 = this.onChangeTap1.bind(this);
        this.onChangeTap2 = this.onChangeTap2.bind(this);
        this.onChangeTap3 = this.onChangeTap3.bind(this);
        this.onChangeTap4 = this.onChangeTap4.bind(this);
    }
    
    public render() {
        if (!this.props.fourTap) { return null; }

        return (
            <DspTapSettings
                tap={this.props.fourTap}
                onChangeTempo={this.onChangeTempo}
                onChangeFeedback={this.onChangeFeedback}
                onChangeFilter={this.onChangeFilter}
                onChangeTap1={this.onChangeTap1}
                onChangeTap2={this.onChangeTap2}
                onChangeTap3={this.onChangeTap3}
                onChangeTap4={this.onChangeTap4}
            />
        );
    }

    private onChangeTempo(value: DspTempo) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { tempo: value } } });
    }

    private onChangeFeedback(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { feedback: value } } });
    }

    private onChangeFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { frequency: value  } } });
    }

    private onChangeTap1(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { tap1: value } } });
    }

    private onChangeTap2(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { tap2: value } } });
    }

    private onChangeTap3(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { tap3: value } } });
    }

    private onChangeTap4(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { fourTapsDelay: { tap4: value } } });
    }
}
