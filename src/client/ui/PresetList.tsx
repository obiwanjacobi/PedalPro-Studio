import * as React from "react";

import { PresetListItem } from "./PresetListItem";
import { Preset } from "../Preset";
import { ChangePresets } from "../ChangePresetsAction";
import { EditPreset } from "../EditPresetAction";
import { MovePresets } from "../MovePresetsAction";
import { DeletePresets } from "../DeletePresetsAction";
import { VirtualList, VirtualListProps } from "../controls/VirtualList";

export interface PresetListProps extends VirtualListProps<Preset> {
    empty: React.ReactNode;
    maxPresetCount: number;
}
export type PresetListActions = ChangePresets & Partial<EditPreset> & Partial<MovePresets> & Partial<DeletePresets>;
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
                maxPresetCount={this.props.maxPresetCount}
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