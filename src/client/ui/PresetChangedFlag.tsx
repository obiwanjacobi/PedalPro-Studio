import * as React from "react";
import { Flag, FlagOutline  } from "mdi-material-ui";

import { Preset, presetHasChanged, onlyIndexHasChanged } from "../Preset";

export interface PresetChangedFlagProps {
    preset: Preset;
}

export class PresetChangedFlag extends React.Component<PresetChangedFlagProps> {

    public render() {
        if (onlyIndexHasChanged(this.props.preset)) {
            return <FlagOutline color="secondary" />; 
        } else if (presetHasChanged(this.props.preset)) { 
            return <Flag color="secondary" />; 
        }
        return null;
    }
}