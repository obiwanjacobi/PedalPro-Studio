import * as React from "react";
import { Checkbox, Collapse, IconButton, Grid, Paper, Typography } from "@material-ui/core";

import { StorageBank } from "./StorageBank";
import { ChangeStorageBanks } from "./ChangeStorageBanksAction";
import { LoadStorageBankPresets } from "./LoadStorageBankPresetsAction";
import { StorageBankListItemDetail } from "./StorageBankListItemDetail";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { RenameStorageBank } from "./RenameStorageBankAction";
import { bankNeedsLoading } from "./BankOperations";
import { DeleteStorageBank } from "./DeleteStorageBankAction";
import { StorageBankChangedFlag } from "./StorageBankChangedFlag";
import { Preset } from "../preset/Preset";

export interface StorageBankListItemProps {
    bank: StorageBank;
    presets: Preset[];
}
export type StorageBankListItemActions = 
    ChangeStorageBanks & LoadStorageBankPresets & RenameStorageBank & DeleteStorageBank;
export type StorageBankListItemAllProps = StorageBankListItemProps & StorageBankListItemActions;

export class StorageBankListItem extends React.Component<StorageBankListItemAllProps> {
    public constructor(props: StorageBankListItemAllProps) {
        super(props);
        this.onBankSelectedChanged = this.onBankSelectedChanged.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }
    
    public render() {
        return (
            <Paper elevation={2} style={{width: "100%"}}>
                <Grid container={true} alignItems="center" spacing={8}>
                    <Grid xs={2} item={true}>
                        <Checkbox 
                            disableRipple={true} 
                            checked={this.props.bank.ui.selected}
                            onChange={this.onBankSelectedChanged}
                        />
                    </Grid>
                    <Grid xs={7} item={true}>
                        <Typography variant="subheading">
                            {this.props.bank.name}
                        </Typography>
                    </Grid>
                    <Grid xs={1} item={true}>
                        <StorageBankChangedFlag bank={this.props.bank} presets={this.props.presets} />
                    </Grid>
                    <Grid xs={1} item={true}>
                        <IconButton onClick={this.toggleExpanded} >
                            {this.props.bank.ui.expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Grid>
                    <Collapse in={this.props.bank.ui.expanded}>
                        {this.props.bank.ui.expanded &&
                            <StorageBankListItemDetail
                                bank={this.props.bank}
                                renameStorageBank={this.props.renameStorageBank}
                                deleteStorageBank={this.props.deleteStorageBank}
                            />
                        }
                    </Collapse>
                </Grid>
            </Paper>
        );
    }

    private onBankSelectedChanged(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (checked) {
            this.loadPresets();
        }
        this.toggleSelected();
    }
    private loadPresets() {
        if (bankNeedsLoading(this.props.bank)) {
            this.props.loadStorageBankPresets(this.props.bank.name);
        }
    }

    private toggleExpanded() {
        this.props.changeStorageBanks(
            [this.props.bank], 
            {expanded: !this.props.bank.ui.expanded});
    }

    private toggleSelected() {
        this.props.changeStorageBanks(
            [this.props.bank], 
            {selected: !this.props.bank.ui.selected});
    }
}