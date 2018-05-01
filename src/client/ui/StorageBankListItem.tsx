import * as React from "react";
import { Checkbox, ListItem, ListItemText } from "material-ui";

import { StorageBank } from "../StorageBank";
import { ChangeBanks } from "../ChangeBanksAction";
import { LoadBankPresets } from "../LoadBankPresetsAction";

export interface StorageBankListItemProps {
    bank: StorageBank;
}
export type StorageBankListItemActions = ChangeBanks & LoadBankPresets;

export type StorageBankListItemAllProps = StorageBankListItemProps & StorageBankListItemActions;

export class StorageBankListItem extends React.Component<StorageBankListItemAllProps> {
    public constructor(props: StorageBankListItemAllProps) {
        super(props);
        this.loadPresets = this.loadPresets.bind(this);
    }
    
    public render() {
        return (
            <ListItem button={true} onClick={this.loadPresets}>
                <Checkbox 
                    tabIndex={-1} 
                    disableRipple={true} 
                    checked={this.props.bank.ui.selected} 
                />
                <ListItemText primary={this.props.bank.bank} />
            </ListItem>
        );
    }

    private loadPresets() {
        if (!this.props.bank.loaded) {
            this.props.loadBankPresets(this.props.bank.bank);
        }
        this.toggleSelected();
    }

    // private toggleExpanded() {
    //     this.props.changeBanks(
    //         [this.props.bank], 
    //         {expanded: !this.props.bank.ui.expanded});
    // }

    private toggleSelected() {
        this.props.changeBanks(
            [this.props.bank], 
            {selected: !this.props.bank.ui.selected});
    }
}