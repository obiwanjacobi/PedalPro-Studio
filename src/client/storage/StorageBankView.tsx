import * as React from "react";
import { Typography, Toolbar, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { StorageBankList } from "./StorageBankList";
import { StorageBank } from "./StorageBank";
import { ChangeStorageBanks } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresets } from "./LoadStorageBankPresetsAction";
import { FlexContainer } from "../controls/FlexContainer";
import { AddStorageBank } from "./AddStorageBankAction";
import { RenameStorageBank } from "./RenameStorageBankAction";

export interface StorageBankViewProps {
    banks: StorageBank[];
}
export type StorageBankViewActions = LoadStorageBankPresets & ChangeStorageBanks & AddStorageBank & RenameStorageBank;
export type StorageBankViewAllProps = StorageBankViewProps & StorageBankViewActions;
export interface StorageBankViewState { }

export class StorageBankView extends React.Component<StorageBankViewAllProps, StorageBankViewState> {
    public constructor(props: StorageBankViewAllProps) {
        super(props);
        this.addBank = this.addBank.bind(this);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <Toolbar>
                    <Typography variant="subheading">Banks</Typography>
                    <IconButton onClick={this.addBank}>
                        <Add />
                    </IconButton>
                </Toolbar>
                <StorageBankList 
                    items={this.filteredBanks}
                    changeStorageBanks={this.actions.changeStorageBanks}
                    loadStorageBankPresets={this.actions.loadStorageBankPresets}
                    renameStorageBank={this.actions.renameStorageBank}
                />
            </FlexContainer>
        );
    }

    private addBank() {
        this.actions.addStorageBank();
    }

    private get filteredBanks(): StorageBank[] {
        // TODO: add filtering
        return this.props.banks;
    }

    private get actions(): Readonly<StorageBankViewActions> {
        return this.props;
    }
}