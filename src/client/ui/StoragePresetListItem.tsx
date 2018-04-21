import * as React from "react";
import { Typography } from "material-ui";

import { StorageBank } from "../StorageBank";

export interface StoragePresetListItemProps {
    bank: StorageBank;
}

export class StoragePresetListItem extends React.Component<StoragePresetListItemProps> {
    public render() {
        return (
            <Typography>{this.props.bank.bank}</Typography>
        );
    }
}