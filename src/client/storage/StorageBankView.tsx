import * as React from "react";
import { Typography, Toolbar, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { StorageBankList } from "./StorageBankList";
import { StorageBank } from "./StorageBank";
import { ChangeBanks } from "./ChangeBanksAction";
import { LoadBankPresets } from "./LoadBankPresetsAction";
import { FlexContainer } from "../controls/FlexContainer";
import { AddBank } from "./AddBankAction";

export interface StorageBankViewProps {
    banks: StorageBank[];
}
export type StorageBankViewActions = LoadBankPresets & ChangeBanks & AddBank;
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
                    changeBanks={this.actions.changeBanks}
                    loadBankPresets={this.actions.loadBankPresets}
                />
            </FlexContainer>
        );
    }

    private addBank() {
        this.actions.addBank();
    }

    private get filteredBanks(): StorageBank[] {
        // TODO: add filtering
        return this.props.banks;
    }

    private get actions(): Readonly<StorageBankViewActions> {
        return this.props;
    }
}