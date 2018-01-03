import * as React from "react";
import { AppBar, Toolbar, IconButton } from "material-ui";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import FileDownload from "material-ui-icons/FileDownload";
import FileUpload from "material-ui-icons/FileUpload";
import Checkbox from "material-ui/Checkbox/Checkbox";

export interface PresetToolbarProps {
    enableCopy?: boolean;
    enableDownload?: boolean;
    enableUpload?: boolean;
    enableSelectAll?: boolean;
    valueSelectAll?: number;
 }
export interface PresetToolbarEvents { 
    onCopy?(): void;
    onDownload?(): void;
    onUpload?(): void;
    onSelectAll?(): void;
}

export type PresetToolbarAllProps = PresetToolbarEvents & PresetToolbarProps;

export class PresetToolbar extends React.Component<PresetToolbarAllProps> {
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
                    <IconButton disabled={!this.props.enableCopy} onClick={() => this.fireCopy()}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton disabled={!this.props.enableDownload} onClick={() => this.fireDownload()}>
                        <FileDownload />
                    </IconButton>
                    <IconButton disabled={!this.props.enableUpload} onClick={() => this.fireUpload()}>
                        <FileUpload />
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

    private fireDownload() {
        if (this.props.onDownload) {
            this.props.onDownload();
        }
    }

    private fireUpload() {
        if (this.props.onUpload) {
            this.props.onUpload();
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