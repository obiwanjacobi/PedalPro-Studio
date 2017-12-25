import * as React from "react";

export interface PresetSummaryProps {
    index: number;
    name: string;
}

export interface PresetSummaryState { 
    // nothing
}

export class PresetSummary extends React.Component<PresetSummaryProps, PresetSummaryState> {

    public render(): React.ReactNode {
        return (
            <div className="presetSummary">
                <div>{this.props.index}</div>
                <div>{this.props.name}</div>
            </div>
        );
    }
}