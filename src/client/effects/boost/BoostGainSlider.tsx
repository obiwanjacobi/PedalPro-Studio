import * as React from "react";
import { Slider } from "@material-ui/lab";
import { BoostGain, BoostGainValues } from "../../../model/Boost";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";

type BoostGainSliderProps = {
    gain: BoostGain;
};
type BoostGainSliderActions = {
    onChange: (gain: BoostGain) => void;
};
type BoostGainSliderAllProps = BoostGainSliderProps & BoostGainSliderActions;
type BoostGainSliderState = {};
export class BoostGainSlider extends React.Component<BoostGainSliderAllProps, BoostGainSliderState> {
    public constructor(props: BoostGainSliderAllProps) {
        super(props);
    }

    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label="Gain"
                unit="dB"
                control={
                    <Slider 
                        value={BoostGainValues.indexOf(this.props.gain)} 
                        max={BoostGainValues.length} 
                        step={1}
                        onChange={this.onChangeGain}
                    />}
            />        
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.gain, 2, 1);
    }

    private onChangeGain(_: React.ChangeEvent<{}>, value: BoostGain) {
        this.props.onChange(value);
    }
}