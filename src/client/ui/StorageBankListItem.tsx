import * as React from "react";
import { Checkbox, ListItem, ListItemText } from "material-ui";

import { StorageBank } from "../StorageBank";

export interface StorageBankListItemProps {
    bank: StorageBank;
}

export class StorageBankListItem extends React.Component<StorageBankListItemProps> {
    public constructor(props: StorageBankListItemProps) {
        super(props);
        this.onSelectBank = this.onSelectBank.bind(this);
    }
    
    public render() {
        return (
            <ListItem button={true} onClick={this.onSelectBank}>
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.bank.ui.selected} />
                <ListItemText primary={this.props.bank.bank} />
            </ListItem>
        );
    }

    private onSelectBank() {
        // add presets of this bank to the list
    }
}