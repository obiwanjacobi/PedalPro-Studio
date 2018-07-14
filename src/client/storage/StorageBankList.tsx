import * as React from "react";
import { Typography } from "@material-ui/core";

import { VirtualListProps, VirtualList } from "../controls/VirtualList";
import { StorageBank } from "./StorageBank";
import { StorageBankListItem } from "./StorageBankListItem";
import { ChangeStorageBanks } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresets } from "./LoadStorageBankPresetsAction";
import { RenameStorageBank } from "./RenameStorageBankAction";
import { DeleteStorageBank } from "./DeleteStorageBankAction";
import { storagePresetsForBank } from "./BankOperations";
import { Preset } from "../preset/Preset";

export interface StorageBankListProps extends VirtualListProps<StorageBank> {
    presets: Preset[];
}
export type StorageBankListActions = 
    ChangeStorageBanks & LoadStorageBankPresets & RenameStorageBank & DeleteStorageBank;
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
                presets={storagePresetsForBank(this.props.presets, bank.name)}
                changeStorageBanks={this.props.changeStorageBanks}
                loadStorageBankPresets={this.props.loadStorageBankPresets}
                renameStorageBank={this.props.renameStorageBank}
                deleteStorageBank={this.props.deleteStorageBank}
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
