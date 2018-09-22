import * as React from "react";
import { Slider } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { AttenuationGainValues, AttenuationGain } from "../../../model/PreAmp";

type AttenuationGainSliderProps = {
    value: AttenuationGain;
    label: string;
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
            <div>
                <Typography>{this.props.label}</Typography>
                <Slider 
                    value={AttenuationGainValues.indexOf(this.props.value)} 
                    max={AttenuationGainValues.length} 
                    step={1}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(AttenuationGainValues[value]);
    }
}