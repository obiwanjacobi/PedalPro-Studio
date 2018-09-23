import * as React from "react";
import { Slider } from "@material-ui/lab";
import { AttenuationGainValues, AttenuationGain } from "../../../model/PreAmp";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";

type AttenuationGainSliderProps = {
    value: AttenuationGain;
};
type AttenuationGainSliderEvents = {
    onChange: (value: AttenuationGain) => void;
};
type AttenuationGainSliderAllProps = AttenuationGainSliderProps & AttenuationGainSliderEvents;
type AttenuationGainSliderState = {};

export class AttenuationGainSlider extends React.Component<AttenuationGainSliderAllProps, AttenuationGainSliderState> {
    constructor(props: AttenuationGainSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label="Emphasis"
                unit="dB"
                control={
                    <Slider 
                        value={AttenuationGainValues.indexOf(this.props.value)} 
                        max={AttenuationGainValues.length} 
                        step={1}
                        onChange={this.onChange}
                    />}
            />
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.value, 1, 1);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(AttenuationGainValues[value]);
    }
}