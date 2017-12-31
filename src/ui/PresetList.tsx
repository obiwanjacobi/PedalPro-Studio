import * as React from "react";
import { List, ListItem, ListItemText } from "material-ui";
import Preset from "../model/Preset";
// import { PresetSummary } from "../ui/PresetSummary";

export interface PresetListProps {
    presets: Preset[];
}

export interface PresetListState { }

export class PresetList extends React.Component<PresetListProps, PresetListState> {
    private static presetSummary(preset: Preset): React.ReactNode {
        return (
            <ListItem key={preset.index} button={true}>
                <ListItemText primary={preset.name}/>
                {/* <PresetSummary key={preset.index} name={preset.name} index={preset.index} /> */}
            </ListItem>
        );
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div/>; }

        return (
                <List children={this.props.presets.map((preset) => PresetList.presetSummary(preset) )}/>
        );
    }
}