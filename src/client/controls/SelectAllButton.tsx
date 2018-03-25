import * as React from "react";
import Checkbox from "material-ui/Checkbox/Checkbox";
import { IndeterminateCheckBox, CheckBox } from "material-ui-icons";
import { Flag, FlagOutline  } from "mdi-material-ui";

export enum SelectAllButtonStatus {
    NoneSelected,
    SomeSelected,
    SomeChanged,
    AllSelected,
    AllChanged,
}

export interface SelectAllButtonProps {
    enableSelectAll: boolean;
    statusSelectAll: SelectAllButtonStatus;
}

export interface SelectAllButtonEvents {
    onSelectAllChanged(status: SelectAllButtonStatus): void;
}

export type SelectAllButtonAllProps = SelectAllButtonProps & SelectAllButtonEvents;

export class SelectAllButton extends React.PureComponent<SelectAllButtonAllProps> {
    public constructor(props: SelectAllButtonAllProps) {
        super(props);
        // bind event handlers
        this.fireChanged = this.fireChanged.bind(this);
    }
    
    public render() {
        return (
            <Checkbox
                disabled={!this.props.enableSelectAll}
                indeterminate={this.selectedSome}
                checked={this.checked}
                onChange={this.fireChanged}
                checkedIcon={this.props.statusSelectAll === SelectAllButtonStatus.AllSelected ? <CheckBox /> : <Flag />}
                indeterminateIcon={this.props.statusSelectAll === SelectAllButtonStatus.SomeSelected ? 
                    <IndeterminateCheckBox /> : <FlagOutline />}
            />
        );
    }

    private fireChanged() {
        let status = SelectAllButtonStatus.AllSelected;
        if (this.props.statusSelectAll === SelectAllButtonStatus.NoneSelected) {
            status = SelectAllButtonStatus.AllChanged;
        } else if (this.props.statusSelectAll === SelectAllButtonStatus.AllSelected) {
            status = SelectAllButtonStatus.NoneSelected;
        }

        this.props.onSelectAllChanged(status);
    }

    private get checked(): boolean {
        if (this.props.statusSelectAll === SelectAllButtonStatus.AllChanged) { return true; }
        if (this.props.statusSelectAll === SelectAllButtonStatus.AllSelected) { return true; }
        return false;
    }

    private get selectedSome(): boolean {
        if (this.props.statusSelectAll === SelectAllButtonStatus.SomeChanged) { return true; }
        if (this.props.statusSelectAll === SelectAllButtonStatus.SomeSelected) { return true; }
        return false;
    }
}