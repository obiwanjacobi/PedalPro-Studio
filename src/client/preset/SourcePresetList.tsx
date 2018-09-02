import * as React from "react";

import { VirtualList, VirtualListProps } from "../controls/VirtualList";
import { SourcePresetListItem } from "./SourcePresetListItem";
import { Preset } from "./Preset";

export interface SourcePresetListProps extends VirtualListProps<Preset> {}
export interface SourcePresetListState { }

const itemHeightCollapsed = 48;

export class SourcePresetList extends VirtualList<Preset, SourcePresetListProps, SourcePresetListState> {
    protected calcRowHeight(_: Preset[]): number {
        return itemHeightCollapsed;
    }

    protected renderItem(preset: Preset) {
        if (!preset) { return null; }

        return (
            <SourcePresetListItem
                key={preset.index}
                preset={preset}
            />
        );
    }
}