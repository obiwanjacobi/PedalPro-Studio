import * as React from "react";
import { IconButton } from "material-ui";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import FileDownload from "material-ui-icons/FileDownload";
import FileUpload from "material-ui-icons/FileUpload";

import ApplicationToolbar from "./ApplicationToolbar";
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
            <ApplicationToolbar>
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
            </ApplicationToolbar>
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