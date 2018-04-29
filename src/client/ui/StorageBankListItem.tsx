import * as React from "react";
import { Checkbox, ListItem, ListItemText } from "material-ui";

import { StorageBank } from "../StorageBank";
import { ChangeBanks } from "../ChangeBanksAction";

export interface StorageBankListItemProps {
    bank: StorageBank;
}
export type StorageBankListItemActions = ChangeBanks;

export type StorageBankListItemAllProps = StorageBankListItemProps & StorageBankListItemActions;

export class StorageBankListItem extends React.Component<StorageBankListItemAllProps> {
    public constructor(props: StorageBankListItemAllProps) {
        super(props);
        this.toggleSelected = this.toggleSelected.bind(this);
    }
    
    public render() {
        return (
            <ListItem button={true} onClick={this.toggleSelected}>
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.bank.ui.selected} />
                <ListItemText primary={this.props.bank.bank} />
            </ListItem>
        );
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