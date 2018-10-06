import * as React from "react";
import { Slider } from "@material-ui/lab";
import { ResonanceFilter1 } from "../../../model/Filters";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";

type FilterResonanceSliderProps = {
    resonance: ResonanceFilter1;
};
type FilterResonanceSliderEvents = {
    onChange: (resonance: ResonanceFilter1) => void;
};
type FilterResonanceSliderAllProps = FilterResonanceSliderProps & FilterResonanceSliderEvents;
type FilterResonanceSliderState = {};
export class FilterResonanceSlider extends React.Component<FilterResonanceSliderAllProps, FilterResonanceSliderState> {
    public constructor(props: FilterResonanceSliderAllProps) {
        super(props);
        this.onChangeResonance = this.onChangeResonance.bind(this);
    }

    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label="Resonance"
                unit=""
                control={
                    <Slider 
                        value={this.props.resonance} 
                        min={1} 
                        max={18} 
                        step={0.5}
                        onChange={this.onChangeResonance}
                        style={{width: "auto"}}
                    />}
            />        
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.resonance, 1, 1);
    }

    private onChangeResonance(_: React.ChangeEvent<{}>, value: ResonanceFilter1) {
        this.props.onChange(value);
    }
}