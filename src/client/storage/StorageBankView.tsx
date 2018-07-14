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
import { DeleteStorageBank } from "./DeleteStorageBankAction";
import { Preset } from "../preset/Preset";

export interface StorageBankViewProps {
    banks: StorageBank[];
    presets: Preset[];
}
export type StorageBankViewActions = 
    LoadStorageBankPresets & ChangeStorageBanks & AddStorageBank & RenameStorageBank & DeleteStorageBank;
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
                    presets={this.props.presets}
                    changeStorageBanks={this.props.changeStorageBanks}
                    loadStorageBankPresets={this.props.loadStorageBankPresets}
                    renameStorageBank={this.props.renameStorageBank}
                    deleteStorageBank={this.props.deleteStorageBank}
                />
            </FlexContainer>
        );
    }

    private addBank() {
        this.props.addStorageBank();
    }

    private get filteredBanks(): StorageBank[] {
        // TODO: add filtering
        return this.props.banks;
    }
}