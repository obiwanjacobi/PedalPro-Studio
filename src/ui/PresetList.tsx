import * as React from "react";
import { List, ListItem, ListItemText } from "material-ui";
import Checkbox from "material-ui/Checkbox/Checkbox";

import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";

export interface PresetListProps {
    presets: Preset[];
}
export type PresetListActions = SelectPresets;
export interface PresetListState { }

export type PresetListAllProps = PresetListProps & PresetListActions;

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    private dense: boolean = true;

    private get actions(): Readonly<PresetListActions> {
        return  this.props;
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div/>; }

        let index = 0;
        return (
            <List 
                dense={this.dense} 
                disablePadding={true} 
                children={this.props.presets.map((preset) => this.presetSummary(index++, preset))}
            />
        );
    }

    private presetSummary(index: number, preset: Preset): React.ReactNode {
        return (
            <ListItem 
                key={preset.index} 
                button={true} 
                dense={this.dense} 
                disableGutters={this.dense} 
                onClick={() => this.toggleSelected(index)}
            >
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.presets[index].selected} />
                <ListItemText primary={preset.name}/>
            </ListItem>
        );
    }

    private toggleSelected(index: number) {
        const preset = this.props.presets[index];
        const selected = !preset.selected;
        this.actions.selectPresets([preset], selected);
    }
}