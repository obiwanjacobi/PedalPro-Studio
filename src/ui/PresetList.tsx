import * as React from "react";
import { List, ListItem, ListItemText } from "material-ui";

import Preset from "../model/Preset";
import Checkbox from "material-ui/Checkbox/Checkbox";

export interface PresetListProps {
    presets: Preset[];
}
export interface PresetListEvents {
    onSelectionChanged?(preset: Preset, selected: boolean, index: number): void;
}
export interface PresetListState { 
    selected: boolean[];
}

export type PresetListAllProps = PresetListProps & PresetListEvents;

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    public componentWillReceiveProps(nextProps: Readonly<PresetListProps>, nextContext: {}) {
        if (!this.state || this.state.selected.length !== nextProps.presets.length) {
            const initialState = { selected: Array<boolean>(nextProps.presets.length) };
            // make sure all items have a typed value (not undefined)
            for (let i = 0; i < initialState.selected.length; i++) {
                initialState.selected[i] = false;
            }
            this.setState(initialState);
        }
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div/>; }

        let index = 0;
        return (
            <List 
                dense={true} 
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
                dense={true} 
                disableGutters={true} 
                onClick={() => this.toggleSelected(index)}
            >
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.state.selected[index]} />
                <ListItemText primary={preset.name}/>
            </ListItem>
        );
    }

    private toggleSelected(index: number) {
        const newSelects = [...this.state.selected];
        const selected = !this.state.selected[index];
        newSelects[index] = selected;
        this.setState({ selected: newSelects }, () => this.fireSelectionChanged(selected, index));
    }

    private fireSelectionChanged(selected: boolean, index: number) {
        if (this.props.onSelectionChanged) {
            const preset = this.props.presets[index];
            this.props.onSelectionChanged(preset, selected, index);
        }
    }
}