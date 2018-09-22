import * as React from "react";

import { PreAmp } from "./PreAmp";
import { ChangeEffects } from "../ChangeEffectsAction";
import { PercentSlider } from "../PercentSlider";
import { AttenuationGainSlider } from "./AttenuationGainSlider";
import { ToggleSwitch } from "../ToggleSwitch";

type EmphasisSettingsProps = {
    pre: PreAmp;
};
type EmphasisSettingsActions = ChangeEffects;
type EmphasisSettingsAllProps = EmphasisSettingsProps & EmphasisSettingsActions;
type EmphasisSettingsState = {};

export class EmphasisSettings extends React.Component<EmphasisSettingsAllProps, EmphasisSettingsState> {
    constructor(props: EmphasisSettingsAllProps) {
        super(props);
        this.onChangeBoost = this.onChangeBoost.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeHigh = this.onChangeHigh.bind(this);
        this.onChangeLow = this.onChangeLow.bind(this);
        this.onChangeGain = this.onChangeGain.bind(this);
    }
    
    public render() {
        return (
            <div>
                <ToggleSwitch label="Boost" checked={this.props.pre.emphasis.boost} onChange={this.onChangeBoost} />
                <PercentSlider label="Level" value={this.props.pre.emphasis.level} onChange={this.onChangeLevel} />
                <PercentSlider label="Low" value={this.props.pre.emphasis.low} onChange={this.onChangeLow} />
                <PercentSlider label="High" value={this.props.pre.emphasis.high} onChange={this.onChangeHigh} />
                <AttenuationGainSlider label="Gain" value={this.props.pre.emphasis.gain} onChange={this.onChangeGain} />
            </div>
        );
    }

    private onChangeLevel(value: number): void {
        this.props.changeEffects({ pre: { emphasis: { level: value }} });
    }

    private onChangeBoost(checked: boolean) {
        this.props.changeEffects({ pre: { emphasis: { boost: checked }} });
    }

    private onChangeLow(value: number) {
        this.props.changeEffects({ pre: { emphasis: { low: value }} });
    }

    private onChangeHigh(value: number) {
        this.props.changeEffects({ pre: { emphasis: { high: value }} });
    }

    private onChangeGain(value: number) {
        this.props.changeEffects({ pre: { emphasis: { gain: value }} });
    }
}