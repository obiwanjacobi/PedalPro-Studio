import * as React from "react";
import { IconButton } from "material-ui";
import { ContentPaste, ContentCopy, FileDownload, FileUpload } from "material-ui-icons";

import { ApplicationToolbar } from "../client/controls/ApplicationToolbar";
import { SelectAllButton, SelectAllButtonProps, SelectAllButtonEvents } from "../client/controls/SelectAllButton";

export interface PresetToolbarProps {
    enableCopy?: boolean;
    enablePaste?: boolean;
    enableDownload?: boolean;
    enableUpload?: boolean;
}
export interface PresetToolbarEvents { 
    onCopy?(): void;
    onPaste?(): void;
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
        this.firePaste = this.firePaste.bind(this);
        this.fireDownload = this.fireDownload.bind(this);
        this.fireUpload = this.fireUpload.bind(this);
    }
    public render() {
        return (
            <ApplicationToolbar>
                <SelectAllButton
                    enableSelectAll={this.props.enableSelectAll}
                    statusSelectAll={this.props.statusSelectAll}
                    onSelectAllChanged={this.props.onSelectAllChanged}
                />
                {this.props.onCopy &&
                <IconButton disabled={!this.props.enableCopy} onClick={this.fireCopy}>
                    <ContentCopy />
                </IconButton>}
                {this.props.onPaste &&
                <IconButton disabled={!this.props.enablePaste} onClick={this.firePaste}>
                    <ContentPaste />
                </IconButton>}
                {this.props.onDownload &&
                <IconButton disabled={!this.props.enableDownload} onClick={this.fireDownload}>
                    <FileDownload />
                </IconButton>}
                {this.props.onUpload &&
                <IconButton disabled={!this.props.enableUpload} onClick={this.fireUpload}>
                    <FileUpload />
                </IconButton>}
                <img src="../assets/VintageRevolutionLogoText.jpg" alt="logo" className="vrlogo" />
            </ApplicationToolbar>
        );
    }

    private fireCopy() {
        if (this.props.onCopy) {
            this.props.onCopy();
        }
    }

    private firePaste() {
        if (this.props.onPaste) {
            this.props.onPaste();
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