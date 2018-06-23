import * as React from "react";
import { Typography } from "@material-ui/core";

import { VirtualListProps, VirtualList } from "../controls/VirtualList";
import { StorageBank } from "./StorageBank";
import { StorageBankListItem } from "./StorageBankListItem";
import { ChangeStorageBanks } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresets } from "./LoadStorageBankPresetsAction";
import { RenameStorageBank } from "./RenameStorageBankAction";

export interface StorageBankListProps extends VirtualListProps<StorageBank> {
}
export type StorageBankListActions = ChangeStorageBanks & LoadStorageBankPresets & RenameStorageBank;
export interface StorageBankListState {}
export type StorageBankListAllProps = StorageBankListProps & StorageBankListActions;

export class StorageBankList extends VirtualList<StorageBank, StorageBankListAllProps, StorageBankListState> {
    protected calcRowHeight(banksOnRow: StorageBank[]): number {
        return banksOnRow.some((bank: StorageBank) => bank.ui.expanded) ? 100 : 48;
    }

    protected renderItem(bank: StorageBank) {
        if (!bank) { return null; }

        return (
            <StorageBankListItem
                bank={bank}
                changeStorageBanks={this.props.changeStorageBanks}
                loadStorageBankPresets={this.props.loadStorageBankPresets}
                renameStorageBank={this.props.renameStorageBank}
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
