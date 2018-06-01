import * as React from "react";
import { 
    ListItem, ListItemText, Checkbox
} from "@material-ui/core";

import { Preset, formatPresetIndex } from "../Preset";
import { ChangePresets } from "../ChangePresetsAction";
import { PresetCollectionType } from "../ApplicationDocument";

export interface SourcePresetListItemProps {
    preset: Preset;
}
export type SourcePresetListItemAllProps = SourcePresetListItemProps & Partial<ChangePresets>;

export class SourcePresetListItem extends React.Component<SourcePresetListItemAllProps> {
    public constructor(props: SourcePresetListItemAllProps) {
        super(props);
        this.onSelectPreset = this.onSelectPreset.bind(this);
    }

    public render() {
        return (
            <ListItem button={true} onClick={this.onSelectPreset}>
                {this.props.changePresets &&
                    <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.preset.ui.selected} />}
                <ListItemText primary={this.title} secondary={this.props.preset.source.toUpperCase()} />
            </ListItem>
        );
    }

    private get title() {
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }

    private onSelectPreset(_: React.MouseEvent<HTMLElement>) {
        if (this.props.changePresets) {
            this.props.changePresets(
                [this.props.preset], PresetCollectionType.clipboard, 
                { selected: !this.props.preset.ui.selected });
        }
    }
}
