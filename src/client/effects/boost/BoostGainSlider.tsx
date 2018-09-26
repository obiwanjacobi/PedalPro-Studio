import * as React from "react";
import { Slider } from "@material-ui/lab";
import { BoostGain } from "../../../model/Boost";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";

type BoostGainSliderProps = {
    gain: BoostGain;
};
type BoostGainSliderEvents = {
    onChange: (gain: BoostGain) => void;
};
type BoostGainSliderAllProps = BoostGainSliderProps & BoostGainSliderEvents;
type BoostGainSliderState = {};
export class BoostGainSlider extends React.Component<BoostGainSliderAllProps, BoostGainSliderState> {
    public constructor(props: BoostGainSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label="Gain"
                unit="dB"
                control={
                    <Slider 
                        value={this.props.gain} 
                        min={-12} 
                        max={12} 
                        step={0.5}
                        onChange={this.onChange}
                    />}
            />        
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.gain, 2, 1);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number) {
        this.props.onChange(value);
    }
}