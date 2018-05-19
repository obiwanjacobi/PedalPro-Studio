import * as React from "react";
import { 
    ListItem, ListItemText, ListItemSecondaryAction
} from "material-ui";

import { Preset, formatPresetIndex } from "../Preset";
import { PresetCollectionType } from "../ApplicationDocument";
import { PresetChangedFlag } from "../controls/PresetChangedFlag";

export 
const NotFoundPreset: Preset = {
    name: "<No Match>",
    index: -1,
    source: PresetCollectionType.device,
    origin: {
        name: "",
        index: -1,
        meta: { device: "" },
        traits: { singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false},
    },
    ui: { selected: false, expanded: false, markedDeleted: false },
    meta: { device: "" },
    traits: { singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false},
};

export interface OverwrittenListItemProps {
    preset: Preset;
}

export class OverwrittenListItem extends React.Component<OverwrittenListItemProps> {
    public constructor(props: OverwrittenListItemProps) {
        super(props);
    }

    public render() {
        return (
            <ListItem>
                <ListItemText primary={this.title} secondary={this.props.preset.origin.name} />
                <ListItemSecondaryAction>
                    {!this.notFound &&
                    <PresetChangedFlag preset={this.props.preset} />}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private get title() {
        if (this.notFound) { return this.props.preset.name; }
        return formatPresetIndex(this.props.preset) + "  -  " + this.props.preset.name;
    }

    private get notFound(): boolean {
        return this.props.preset === NotFoundPreset;
    }
}
