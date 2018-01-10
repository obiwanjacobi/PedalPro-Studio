import * as React from "react";
import { Dispatch } from "redux";

import Preset from "../client/Preset";
import ApplicationDocument from "../client/ApplicationDocument";
import { createSelectPresetsAction } from "../client/SelectPresetsAction";
import { SelectPresets } from "../client/SelectPresetsAction";

import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";
import ConnectedComponent from "./ConnectedComponent";

export interface LocalPresetFrameProps {
    presets: Preset[];
}
export type LocalPresetFrameActions = SelectPresets;

export class LocalPresetFrame extends ConnectedComponent<LocalPresetFrameProps, LocalPresetFrameActions> {
    public render() {
        return super.renderConnection(
            <div>
                <LocalPresetToolbar enableCopy={this.hasSelection} />
                <PresetView 
                    presets={this.stateProps.presets}
                    selectPresets={this.actions.selectPresets}
                />
            </div>
        );
    }

    protected extractComponentPropsFromState(state: ApplicationDocument): LocalPresetFrameProps {
        return { presets: state.local };
    }
    
    protected createActionObject(dispatch: Dispatch<ApplicationDocument>): LocalPresetFrameActions {
        return {
            selectPresets: (presets: Preset[], selected: boolean): void => {
                dispatch(createSelectPresetsAction(presets, selected));
            },
        };
    }

    private get hasSelection(): boolean {
        if (!this.stateProps.presets) { return false; }
        return this.stateProps.presets.filter((preset: Preset) => preset.selected).length > 0;
    }
}