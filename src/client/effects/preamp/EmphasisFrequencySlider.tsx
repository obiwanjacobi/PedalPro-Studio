import * as React from "react";
import { Slider } from "@material-ui/lab";

import { EmphasisFrequency } from "../../../model/PreAmp";
import { SettingsValueLayout } from "../SettingsValueLayout";

type EmphasisFrequencySliderProps = {
    value: EmphasisFrequency;
};
type EmphasisFrequencySliderEvents = {
    onChange: (value: EmphasisFrequency) => void;
};
type EmphasisFrequencySliderAllProps = EmphasisFrequencySliderProps & EmphasisFrequencySliderEvents;
type EmphasisFrequencySliderState = {};

export class EmphasisFrequencySlider 
    extends React.Component<EmphasisFrequencySliderAllProps, EmphasisFrequencySliderState> {
    
    public constructor(props: EmphasisFrequencySliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label="Frequency" 
                unit="Hz"
                control={
                <Slider 
                    value={this.props.value} 
                    min={1000}
                    max={2000} 
                    step={4}
                    onChange={this.onChange}
                />}
            />
        );
    }

    private get formattedValue(): string {
        return this.props.value.toString();
    }
    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(value);
    }
}