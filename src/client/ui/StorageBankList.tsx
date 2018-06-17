import * as React from "react";
import { Typography } from "@material-ui/core";

import { VirtualListProps, VirtualList } from "../controls/VirtualList";
import { StorageBank } from "../StorageBank";
import { StorageBankListItem } from "./StorageBankListItem";
import { ChangeBanks } from "../ChangeBanksAction";
import { LoadBankPresets } from "../LoadBankPresetsAction";

export interface StorageBankListProps extends VirtualListProps<StorageBank> {
}
export type StorageBankListActions = ChangeBanks & LoadBankPresets;
export interface StorageBankListState {}
export type StorageBankListAllProps = StorageBankListProps & StorageBankListActions;

export class StorageBankList extends VirtualList<StorageBank, StorageBankListAllProps, StorageBankListState> {
    protected calcRowHeight(banksOnRow: StorageBank[]): number {
        return banksOnRow.some((bank: StorageBank) => bank.ui.expanded) ? 142 : 48;
    }

    protected renderItem(bank: StorageBank) {
        if (!bank) { return null; }

        return (
            <StorageBankListItem
                bank={bank}
                changeBanks={this.props.changeBanks}
                loadBankPresets={this.props.loadBankPresets}
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
