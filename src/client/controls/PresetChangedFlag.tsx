import * as React from "react";
import { Flag, FlagOutline, DeleteForever  } from "mdi-material-ui";

import { Preset } from "../preset/Preset";
import { onlyIndexHasChanged, presetHasChanged } from "../preset/PresetOperations";

export interface PresetChangedFlagProps {
    preset: Preset;
}

export class PresetChangedFlag extends React.Component<PresetChangedFlagProps> {

    public render() {
        if (onlyIndexHasChanged(this.props.preset)) {
            return <FlagOutline color="secondary" />; 
        } else if (presetHasChanged(this.props.preset)) { 
            return this.props.preset.traits.empty ?
                <DeleteForever color="secondary" />
                : <Flag color="secondary" />; 
        }
        return null;
    }
}