import * as React from "react";
import { Typography } from "material-ui";

import { VirtualListProps, VirtualList } from "../controls/VirtualList";
import { StorageBank } from "../StorageBank";
import { StorageBankListItem } from "./StorageBankListItem";

export interface StorageBankListProps extends VirtualListProps<StorageBank> {
}
export interface StorageBankListState {}

export class StorageBankList extends VirtualList<StorageBank, StorageBankListProps, StorageBankListState> {
    protected calcRowHeight(banksOnRow: StorageBank[]): number {
        return banksOnRow.some((bank: StorageBank) => bank.ui.expanded) ? 40 : 80;
    }

    protected renderItem(bank: StorageBank) {
        if (!bank) { return null; }

        return (
            <StorageBankListItem
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
