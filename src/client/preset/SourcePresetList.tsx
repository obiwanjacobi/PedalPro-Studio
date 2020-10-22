import * as React from "react";

import { VirtualList, VirtualListProps } from "../controls/VirtualList";
import { SourcePresetListItem } from "./SourcePresetListItem";
import { ChangePresets } from "./ChangePresetsAction";
import { Preset } from "./Preset";

export interface SourcePresetListProps extends VirtualListProps<Preset> { }
export type SourcePresetListAllProps = SourcePresetListProps & Partial<ChangePresets>;

export interface SourcePresetListState { }

const itemHeightCollapsed = 58;

export class SourcePresetList extends VirtualList<Preset, SourcePresetListAllProps, SourcePresetListState> {
    protected calcRowHeight(_: Preset[]): number {
        return itemHeightCollapsed;
    }

    protected renderItem(preset: Preset) {
        if (!preset) { return null; }

        return (
            <SourcePresetListItem
                key={preset.index}
                preset={preset}
                changePresets={this.props.changePresets}
            />
        );
    }
}