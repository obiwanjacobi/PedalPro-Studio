import * as React from "react";
import { 
    ListItem, ListItemText, ListItemSecondaryAction
} from "@material-ui/core";

import { Preset } from "../preset/Preset";
import { PresetCollectionType } from "../ApplicationDocument";
import { PresetChangedFlag } from "../controls/PresetChangedFlag";
import { formatPresetFullName } from "../preset/PresetOperations";

export 
const NotFoundPreset: Preset = {
    name: "<No Match>",
    index: -1,
    source: PresetCollectionType.device,
    origin: {
        name: "",
        index: -1,
        meta: { device: "" },
        traits: { singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false },
    },
    ui: { selected: false, expanded: false, markedDeleted: false },
    meta: { device: "" },
    traits: { singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false },
};

export interface PreviewListItemProps {
    preset: Preset;
    match: boolean;
}

export class PreviewListItem extends React.Component<PreviewListItemProps> {
    public constructor(props: PreviewListItemProps) {
        super(props);
    }

    public render() {
        return (
            <ListItem>
                <ListItemText primary={this.title} secondary={this.subTitle} />
                <ListItemSecondaryAction>
                    {!this.notFound &&
                    <PresetChangedFlag preset={this.props.preset} />}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private get title() {
        if (this.notFound) { return this.props.preset.name; }
        return formatPresetFullName(this.props.preset);
    }

    private get subTitle() {
        if (this.notFound) { return ""; }
        
        if (this.props.match) {
            return formatPresetFullName(this.props.preset.origin) + " *";    
        }

        return formatPresetFullName(this.props.preset.origin);
    }

    private get notFound(): boolean {
        return this.props.preset === NotFoundPreset;
    }
}
