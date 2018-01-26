import * as React from "react";
import { IconButton } from "material-ui";
import ContentCopy from "material-ui-icons/ContentCopy";
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

export class PresetToolbar extends React.PureComponent<PresetToolbarAllProps> {
    constructor(props: PresetToolbarAllProps) {
        super(props);
        // bind event handlers
        this.fireCopy = this.fireCopy.bind(this);
        this.fireDownload = this.fireDownload.bind(this);
        this.fireUpload = this.fireUpload.bind(this);
    }
    public render() {
        return (
            <ApplicationToolbar>
                <SelectAllButton
                    enableSelectAll={this.props.enableSelectAll}
                    valueSelectAll={this.props.valueSelectAll}
                    onSelectAll={this.props.onSelectAll}
                />
                <IconButton disabled={!this.props.enableCopy} onClick={this.fireCopy}>
                    <ContentCopy />
                </IconButton>
                <IconButton disabled={!this.props.enableDownload} onClick={this.fireDownload}>
                    <FileDownload />
                </IconButton>
                <IconButton disabled={!this.props.enableUpload} onClick={this.fireUpload}>
                    <FileUpload />
                </IconButton>
                <img src="../assets/VintageRevolutionLogoText.jpg" alt="logo" className="vrlogo" />
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