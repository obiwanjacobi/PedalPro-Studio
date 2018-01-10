import * as React from "react";
import { AppBar, Toolbar, IconButton } from "material-ui";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import FileDownload from "material-ui-icons/FileDownload";
import FileUpload from "material-ui-icons/FileUpload";
import { SelectAllButton, SelectAllButtonProps, SelectAllButtonEvents } from "./SelectAllButton";

export interface PresetToolbarProps {
    enableCopy?: boolean;
    enableDownload?: boolean;
    enableUpload?: boolean;
}
export interface PresetToolbarEvents { 
    onCopy?(): void;
    onDownload?(): void;
    onUpload?(): void;
}

export type PresetToolbarAllProps = 
    PresetToolbarEvents & PresetToolbarProps & SelectAllButtonProps & SelectAllButtonEvents;

export class PresetToolbar extends React.Component<PresetToolbarAllProps> {
    public render() {
        return (
            <AppBar position="static">
                <Toolbar disableGutters={true}>
                    <SelectAllButton
                        enableSelectAll={this.props.enableSelectAll}
                        valueSelectAll={this.props.valueSelectAll}
                        onSelectAll={this.props.onSelectAll}
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
}