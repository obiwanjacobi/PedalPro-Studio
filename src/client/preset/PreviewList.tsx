import * as React from "react";

import { VirtualList, VirtualListProps } from "../controls/VirtualList";
import { PreviewListItem } from "./PreviewListItem";
import { Preset } from "./Preset";

export interface PreviewListProps extends VirtualListProps<Preset> {}
export interface PreviewListState { }

const itemHeightCollapsed = 48;

export class PreviewList extends VirtualList<Preset, PreviewListProps, PreviewListState> {
    protected calcRowHeight(_: Preset[]): number {
        return itemHeightCollapsed;
    }

    protected renderItem(preset: Preset) {
        if (!preset) { return null; }

        return (
            <PreviewListItem
                key={preset.index}
                preset={preset}
                match={preset.ui.selected}
            />
        );
    }
}