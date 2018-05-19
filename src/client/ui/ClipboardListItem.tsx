import * as React from "react";
import { 
    ListItem, ListItemText, ListItemSecondaryAction, Checkbox
} from "material-ui";

import { Preset, formatPresetIndex } from "../Preset";
import { ChangePresets } from "../ChangePresetsAction";
import { PresetCollectionType } from "../ApplicationDocument";

export interface ClipboardListItemProps {
    preset: Preset;
}
export type ClipboardListItemAllProps = ClipboardListItemProps & ChangePresets;

export class ClipboardListItem extends React.Component<ClipboardListItemAllProps> {
    public constructor(props: ClipboardListItemAllProps) {
        super(props);
        this.onSelectPreset = this.onSelectPreset.bind(this);
    }

    public render() {
        return (
            <ListItem button={true} onClick={this.onSelectPreset}>
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.preset.ui.selected} />
                <ListItemText primary={this.title} secondary={this.props.preset.source.toUpperCase()} />
                <ListItemSecondaryAction />
            </ListItem>
        );
    }

    private get title() {
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }
    private onSelectPreset(_: React.MouseEvent<HTMLElement>) {
        this.props.changePresets(
            [this.props.preset], PresetCollectionType.clipboard, 
            { selected: !this.props.preset.ui.selected });
    }
}
