import * as React from "react";
import { Slider } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { EmphasisFrequency } from "../../../model/PreAmp";

type EmphasisFrequencySliderProps = {
    value: EmphasisFrequency;
    label: string;
};
type EmphasisFrequencySliderEvents = {
    onChange: (value: EmphasisFrequency) => void;
};
type EmphasisFrequencySliderAllProps = EmphasisFrequencySliderProps & EmphasisFrequencySliderEvents;
type EmphasisFrequencySliderState = {};

export class EmphasisFrequencySlider extends React.Component<EmphasisFrequencySliderAllProps, EmphasisFrequencySliderState> {
    constructor(props: EmphasisFrequencySliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <div>
                <Typography>{this.props.label}</Typography>
                <Slider 
                    value={this.props.value} 
                    min={1000}
                    max={2000} 
                    step={4}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(value);
    }
}