import * as React from "react";
import { Collapse } from "material-ui";
import Checkbox from "material-ui/Checkbox/Checkbox";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import ListItemSecondaryAction from "material-ui/List/ListItemSecondaryAction";
import IconButton from "material-ui/IconButton/IconButton";
import ExpandMore from "material-ui-icons/ExpandMore";
import ExpandLess from "material-ui-icons/ExpandLess";

import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";

export interface PresetListProps {
    presets: Preset[];
}
export type PresetListActions = SelectPresets;
export interface PresetListState {
    expanded: boolean[];
 }

export type PresetListAllProps = PresetListProps & PresetListActions;

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    private dense: boolean = true;

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div/>; }

        return (
            <List dense={this.dense} disablePadding={this.dense}>
                {this.props.presets.map(
                    (preset: Preset, index: number) => {
                        return [ this.presetSummary(index, preset),
                        this.presetDetails(index, preset) ];
                    }
                )}
            </List>
        );
    }

    public componentWillReceiveProps(newProps: PresetListAllProps) {
        this.setState({ expanded: new Array<boolean>(newProps.presets.length) });
    }

    private presetSummary(index: number, preset: Preset): React.ReactNode {
        return (
            <ListItem 
                key={"s" + index} 
                button={true} 
                dense={this.dense} 
                disableGutters={this.dense} 
                onClick={() => this.toggleSelected(index)}
            >
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.presets[index].selected} />
                <ListItemText primary={preset.name} />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => this.toggleExpanded(index)} >
                        {this.state.expanded[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private presetDetails(index: number, preset: Preset): React.ReactNode {
        return (
            <Collapse 
                component="li"
                key={"d" + index} 
                in={this.state.expanded[index]}
            >
                <ExpandMore />
            </Collapse>
        );
    }

    private toggleExpanded(index: number) {
        const newExpanded = this.state.expanded.slice();
        newExpanded[index] = !this.state.expanded[index];
        this.setState({ expanded: newExpanded });
    }

    private toggleSelected(index: number) {
        const preset = this.props.presets[index];
        const selected = !preset.selected;
        this.props.selectPresets([preset], selected);
    }
}