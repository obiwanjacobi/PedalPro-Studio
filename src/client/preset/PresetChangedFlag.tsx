import * as React from "react";
import { Alert, Flag, FlagOutline, DeleteForever  } from "mdi-material-ui";

import { Preset } from "./Preset";
import { onlyIndexHasChanged, presetHasChanged } from "./PresetOperations";

export interface PresetChangedFlagProps {
    preset: Preset;
}

export class PresetChangedFlag extends React.Component<PresetChangedFlagProps> {

    public render() {
        if (this.props.preset.index < 0) {
            return <Alert color="secondary" />;
        } else if (this.props.preset.ui.markedDeleted) {
            return <DeleteForever color="secondary" />;
        } else if (onlyIndexHasChanged(this.props.preset)) {
            return <FlagOutline color="secondary" />; 
        } else if (presetHasChanged(this.props.preset)) { 
            return <Flag color="secondary" />; 
        }
        return null;
    }
}