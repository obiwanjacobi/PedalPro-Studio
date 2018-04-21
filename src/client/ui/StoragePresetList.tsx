import * as React from "react";
import { Typography } from "material-ui";

import { VirtualListProps, VirtualList } from "../controls/VirtualList";
import { StorageBank } from "../StorageBank";
import { StoragePresetListItem } from "./StoragePresetListItem";

export interface StoragePresetListProps extends VirtualListProps<StorageBank> {
}
export interface StoragePresetListState {}

export class StoragePresetList extends VirtualList<StorageBank, StoragePresetListProps, StoragePresetListState> {
    protected calcRowHeight(banksOnRow: StorageBank[]): number {
        return banksOnRow.some((bank: StorageBank) => bank.ui.expanded) ? 40 : 80;
    }

    protected renderItem(bank: StorageBank) {
        if (!bank) { return null; }

        return (
            <StoragePresetListItem
                bank={bank}
            />
        );
    }

    protected renderEmpty() {
        return (
            <div style={{textAlign: "center"}}>
                <Typography>No banks found.</Typography>
            </div>
        );
    }   
}
