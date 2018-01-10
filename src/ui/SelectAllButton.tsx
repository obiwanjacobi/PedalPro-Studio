import * as React from "react";
import Checkbox from "material-ui/Checkbox/Checkbox";

export interface SelectAllButtonProps {
    enableSelectAll: boolean;
    valueSelectAll: number;
}

export interface SelectAllButtonEvents {
    onSelectAll(): void;
}

export class SelectAllButton extends React.Component<SelectAllButtonProps & SelectAllButtonEvents> {
    public render() {
        return (
            <Checkbox
                disabled={!this.props.enableSelectAll}
                indeterminate={this.selectedSome}
                checked={this.selected}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onSelectAll()}
            />
        );
    }

    private get selected(): boolean {
        if (this.props.valueSelectAll > 0) { return true; }
        return false;
    }

    private get selectedSome(): boolean {
        if (this.props.valueSelectAll < 0) { return true; }
        return false;
    }
}