import * as React from "react";
import { Slider } from "@material-ui/lab";
import { BoostGain, BoostGainValues } from "../../../model/Boost";
import { ChangeEffects } from "../ChangeEffectsAction";

type BoostGainSliderProps = {
    gain: BoostGain;
};
type BoostGainSliderActions = ChangeEffects;
type BoostGainSliderAllProps = BoostGainSliderProps & BoostGainSliderActions;
type BoostGainSliderState = {};
export class BoostGainSlider extends React.Component<BoostGainSliderAllProps, BoostGainSliderState> {
    constructor(props: BoostGainSliderAllProps)
    {
        super(props);
        this.changeBoostGain = this.changeBoostGain.bind(this);
    }

    public render() {
        return (
            <Slider 
                value={BoostGainValues.indexOf(this.props.gain)} 
                max={BoostGainValues.length} 
                step={1}
                onChange={this.changeBoostGain}
            />
        );
    }

    private changeBoostGain(_: React.ChangeEvent<{}>, value: number) {
        this.props.changeEffects({ boost: { gain: BoostGainValues[value] } });
    }
}