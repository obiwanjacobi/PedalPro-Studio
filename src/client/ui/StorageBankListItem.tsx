import * as React from "react";
import { Checkbox, ListItem, ListItemText, Collapse, IconButton, Grid, Paper } from "@material-ui/core";

import { StorageBank } from "../StorageBank";
import { ChangeBanks } from "../ChangeBanksAction";
import { LoadBankPresets } from "../LoadBankPresetsAction";
import { StorageBankListItemDetail } from "./StorageBankListItemDetail";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

export interface StorageBankListItemProps {
    bank: StorageBank;
}
export type StorageBankListItemActions = ChangeBanks & LoadBankPresets;

export type StorageBankListItemAllProps = StorageBankListItemProps & StorageBankListItemActions;

export class StorageBankListItem extends React.Component<StorageBankListItemAllProps> {
    public constructor(props: StorageBankListItemAllProps) {
        super(props);
        this.loadPresets = this.loadPresets.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }
    
    public render() {
        return (
            <ListItem>
                <Paper elevation={2} style={{width: "100%"}}>
                    <Grid container={true} alignItems="center" spacing={8}>
                        <Grid xs={2} item={true}>
                            <Checkbox 
                                tabIndex={-1} 
                                disableRipple={true} 
                                checked={this.props.bank.ui.selected}
                                onClick={this.loadPresets}
                            />
                        </Grid>
                        <Grid xs={7} item={true}>
                            <ListItemText primary={this.props.bank.name} />
                        </Grid>
                        <Grid xs={1} item={true}>
                            {/* <PresetChangedFlag preset={this.props.preset} /> */}
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
                                />
                            }
                        </Collapse>
                    </Grid>
                </Paper>
            </ListItem>
        );
    }

    private loadPresets() {
        if (!this.props.bank.loaded && this.props.bank.created) {
            this.props.loadBankPresets(this.props.bank.name);
        }
        this.toggleSelected();
    }

    private toggleExpanded() {
        this.props.changeBanks(
            [this.props.bank], 
            {expanded: !this.props.bank.ui.expanded});
    }

    private toggleSelected() {
        this.props.changeBanks(
            [this.props.bank], 
            {selected: !this.props.bank.ui.selected});
    }
}