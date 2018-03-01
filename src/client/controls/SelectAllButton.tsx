import * as React from "react";
import Checkbox from "material-ui/Checkbox/Checkbox";

export interface SelectAllButtonProps {
    enableSelectAll: boolean;
    valueSelectAll: number;
}

export interface SelectAllButtonEvents {
    onSelectAll(): void;
}

export type SelectAllButtonAllProps = SelectAllButtonProps & SelectAllButtonEvents;

export class SelectAllButton extends React.PureComponent<SelectAllButtonAllProps> {
    public constructor(props: SelectAllButtonAllProps) {
        super(props);
        // bind event handlers
        this.fireSelectAll = this.fireSelectAll.bind(this);
    }
    
    public render() {
        return (
            <Checkbox
                disabled={!this.props.enableSelectAll}
                indeterminate={this.selectedSome}
                checked={this.selected}
                onChange={this.fireSelectAll}
            />
        );
    }

    private fireSelectAll() {
        this.props.onSelectAll();
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