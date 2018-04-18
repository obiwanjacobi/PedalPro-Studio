import * as React from "react";

import { PresetListItem } from "./PresetListItem";
import { Preset } from "../client/Preset";
import { ChangePresets } from "../client/ChangePresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";
import { DeletePresets } from "../client/DeletePresetsAction";
import { VirtualList, VirtualListProps } from "../client/controls/VirtualList";

export interface PresetListProps extends VirtualListProps<Preset> {
    empty: React.ReactNode;
}
export type PresetListActions = ChangePresets & Partial<EditPreset> & Partial<MovePreset> & Partial<DeletePresets>;
export interface PresetListState { }

export type PresetListAllProps = PresetListProps & PresetListActions;

const itemHeightCollapsed = 48;
const itemHeightExpanded = 96;

export class PresetList extends VirtualList<Preset, PresetListAllProps, PresetListState> {
    protected calcRowHeight(presetsOnRow: Preset[]): number {
        return presetsOnRow.some((preset: Preset) => preset.ui.expanded) ? itemHeightExpanded : itemHeightCollapsed;
    }

    protected renderItem(preset: Preset) {
        if (!preset) { return null; }

        return (
            <PresetListItem
                preset={preset}
                changePresets={this.props.changePresets}
                editPreset={this.props.editPreset}
                movePreset={this.props.movePreset}
                deletePresets={this.props.deletePresets}
            />
        );
    }

    protected renderEmpty() {
        return (
            <div style={{textAlign: "center"}}>
                {this.props.empty}
            </div>
        );
    }
}