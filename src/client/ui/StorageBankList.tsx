import * as React from "react";
import { Typography } from "material-ui";

import { VirtualListProps, VirtualList } from "../controls/VirtualList";
import { StorageBank } from "../StorageBank";
import { StorageBankListItem } from "./StorageBankListItem";
import { ChangeBanks } from "../ChangeBanksAction";

export interface StorageBankListProps extends VirtualListProps<StorageBank> {
}
export type StorageBankListActions = ChangeBanks;
export interface StorageBankListState {}
export type StorageBankListAllProps = StorageBankListProps & StorageBankListActions;

export class StorageBankList extends VirtualList<StorageBank, StorageBankListAllProps, StorageBankListState> {
    protected calcRowHeight(banksOnRow: StorageBank[]): number {
        return banksOnRow.some((bank: StorageBank) => bank.ui.expanded) ? 32 : 60;
    }

    protected renderItem(bank: StorageBank) {
        if (!bank) { return null; }

        return (
            <StorageBankListItem
                bank={bank}
                changeBanks={this.props.changeBanks}
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
