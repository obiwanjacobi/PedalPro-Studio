import * as React from "react";

import { PresetListItem } from "./PresetListItem";
import { Preset } from "../preset/Preset";
import { ChangePresets } from "../preset/ChangePresetsAction";
import { EditPreset } from "../preset/EditPresetAction";
import { MovePresets, CanMoveDown } from "../preset/MovePresetsAction";
import { DeletePresets } from "../preset/DeletePresetsAction";
import { VirtualList, VirtualListProps } from "../controls/VirtualList";

export interface PresetListProps extends VirtualListProps<Preset> {
    empty: React.ReactNode;
}
export type PresetListActions = 
    ChangePresets & Partial<EditPreset> & Partial<MovePresets> & Partial<DeletePresets> & Partial<CanMoveDown>;
export interface PresetListState { }

export type PresetListAllProps = PresetListProps & PresetListActions;

const itemHeightCollapsed = 48;
const itemHeightExpanded = 100;

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
                movePresets={this.props.movePresets}
                deletePresets={this.props.deletePresets}
                canMoveDown={this.props.canMoveDown}
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