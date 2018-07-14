import * as React from "react";
import { Flag, FlagOutline, DeleteForever  } from "mdi-material-ui";

import { StorageBank } from "./StorageBank";
import { bankNameHasChanged } from "./BankOperations";
import { Preset } from "../preset/Preset";
import { presetsHaveChanged } from "../preset/PresetOperations";

export interface StorageBankChangedFlagProps {
    bank: StorageBank;
    presets: Preset[];
}

export class StorageBankChangedFlag extends React.Component<StorageBankChangedFlagProps> {

    public render() {
        if (this.props.bank.ui.markedDeleted) {
            return <DeleteForever color="secondary" />;
        } else if (presetsHaveChanged(this.props.presets)) { 
            return <Flag color="secondary" />;
        } else if (bankNameHasChanged(this.props.bank)) {
            return <FlagOutline color="secondary" />;
        }
        return null;
    }
}