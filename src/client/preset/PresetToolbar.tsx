import * as React from "react";
import { IconButton, Badge } from "@material-ui/core";
import { Delete, ContentPaste, ContentCopy, FileDownload, FileUpload, ImportExport } from "@material-ui/icons";

import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { SelectAllButton, SelectAllButtonProps, SelectAllButtonEvents } from "../controls/SelectAllButton";

export interface PresetToolbarProps {
    enableCopy?: boolean;
    enablePaste?: boolean;
    enableDelete?: boolean;
    enableDownload?: boolean;
    uploadCount?: number;
    enableMove?: boolean;
}
export interface PresetToolbarEvents { 
    onCopy?(): void;
    onPaste?(): void;
    onDelete?(): void;
    onDownload?(): void;
    onUpload?(): void;
    onMove?(): void;
}

export type PresetToolbarAllProps = 
    PresetToolbarEvents & PresetToolbarProps & SelectAllButtonProps & SelectAllButtonEvents;

export class PresetToolbar extends React.PureComponent<PresetToolbarAllProps> {
    constructor(props: PresetToolbarAllProps) {
        super(props);
        // bind event handlers
        this.fireCopy = this.fireCopy.bind(this);
        this.firePaste = this.firePaste.bind(this);
        this.fireDelete = this.fireDelete.bind(this);
        this.fireDownload = this.fireDownload.bind(this);
        this.fireUpload = this.fireUpload.bind(this);
        this.fireMove = this.fireMove.bind(this);
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
                {this.props.onMove &&
                <IconButton disabled={!this.props.enableMove} onClick={this.fireMove}>
                    <ImportExport />
                </IconButton>}
                {this.props.onDelete &&
                <IconButton disabled={!this.props.enableDelete} onClick={this.fireDelete}>
                    <Delete />
                </IconButton>}
                {this.props.onDownload &&
                <IconButton disabled={!this.props.enableDownload} onClick={this.fireDownload}>
                    <FileDownload />
                </IconButton>}
                {this.props.onUpload ? (
                    this.enableUpload ? 
                        <Badge badgeContent={this.uploadCount} color="default">
                            <IconButton onClick={this.fireUpload}>
                                <FileUpload />
                            </IconButton>
                        </Badge> :
                        <IconButton disabled={true}>
                            <FileUpload />
                        </IconButton>
                ) : null}
                <img src="../assets/VintageRevolutionLogoText.jpg" alt="logo" className="vrlogo" />
            </ApplicationToolbar>
        );
    }

    private get enableUpload(): boolean {
        if (this.props.uploadCount) {
            return this.props.uploadCount > 0;
        }
        return false;
    }

    private get uploadCount(): number {
        if (this.props.uploadCount) {
            return this.props.uploadCount;
        }
        return 0;
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

    private fireDelete() {
        if (this.props.onDelete) {
            this.props.onDelete();
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

    private fireMove() {
        if (this.props.onMove) {
            this.props.onMove();
        }
    }
}