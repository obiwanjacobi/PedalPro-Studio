import * as React from "react";
import { Checkbox, AppBar, Toolbar, IconButton } from "material-ui";
import ChevronRight from "material-ui-icons/ChevronRight";

export interface LocalPresetToolbarProps {
    enableCopy: boolean;
    enableSelectAll?: boolean;
    valueSelectAll?: number;
 }
export interface LocalPresetToolbarEvents {
    onCopy?(): void;
    onSelectAll?(): void;
}

export type LocalPresetToolbarAllProps = LocalPresetToolbarEvents & LocalPresetToolbarProps;

export class LocalPresetToolbar extends React.Component<LocalPresetToolbarAllProps> {
    public render() {
        return (
            <AppBar position="static">
                <Toolbar disableGutters={true}>
                    <Checkbox
                        hidden={!this.props.valueSelectAll}
                        disabled={!this.props.enableSelectAll}
                        indeterminate={this.selectedSome}
                        checked={this.selected}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.fireSelectAll()}
                    />
                    <IconButton 
                        style={{ position: "absolute", top: 10, right: 20}} 
                        disabled={!this.props.enableCopy}
                        onClick={() => this.fireCopy()}
                    >
                        <ChevronRight />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

    private fireCopy() {
        if (this.props.onCopy) {
            this.props.onCopy();
        }
    }

    private fireSelectAll() {
        if (this.props.onSelectAll) {
            this.props.onSelectAll();
        }
    }

    private get selected(): boolean {
        if (!this.props.valueSelectAll) { return false; }
        if (this.props.valueSelectAll > 0) { return true; }
        return false;
    }

    private get selectedSome(): boolean {
        if (!this.props.valueSelectAll) { return false; }
        if (this.props.valueSelectAll < 0) { return true; }
        return false;
    }
}