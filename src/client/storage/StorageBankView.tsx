import * as React from "react";
import { Typography, Toolbar, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { FlexContainer } from "../controls/FlexContainer";
import { Preset } from "../preset/Preset";
import { StorageBankList } from "./StorageBankList";
import { StorageBank } from "./StorageBank";
import { ChangeStorageBanks } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresets } from "./LoadStorageBankPresetsAction";
import { AddStorageBank } from "./AddStorageBankAction";
import { RenameStorageBank } from "./RenameStorageBankAction";
import { DeleteStorageBank } from "./DeleteStorageBankAction";

export interface StorageBankViewProps {
    banks?: StorageBank[];
    presets: Preset[];
}
export type StorageBankViewActions = 
    LoadStorageBankPresets & ChangeStorageBanks & AddStorageBank & RenameStorageBank & DeleteStorageBank;
export type StorageBankViewAllProps = StorageBankViewProps & StorageBankViewActions;
export interface StorageBankViewState { }

const styles = {
    small: { 
        marginLeft: "auto",
        marginRight: "8px",
        width: 34,
        height: 20,
    }
};

export class StorageBankView extends React.Component<StorageBankViewAllProps, StorageBankViewState> {
    public constructor(props: StorageBankViewAllProps) {
        super(props);
        this.addBank = this.addBank.bind(this);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <Toolbar>
                    <Typography variant="subtitle1">Banks</Typography>
                    <Button 
                        onClick={this.addBank} 
                        disabled={this.disableAddBank()} 
                        color="primary" 
                        variant="fab" 
                        style={styles.small}
                    >
                        <Add />
                    </Button>
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

    private disableAddBank(): boolean {
        return !this.props.banks;
    }

    private addBank() {
        this.props.addStorageBank();
    }

    private get filteredBanks(): StorageBank[] {
        // TODO: add filtering
        return this.props.banks || [];
    }
}