import * as React from "react";
import { IconButton, Badge, Hidden } from "@material-ui/core";
import { Delete, ImportExport } from "@material-ui/icons";
import { Download, Upload, ContentPaste, ContentCopy } from "mdi-material-ui";

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
                    <IconButton disabled={!this.props.enableCopy} onClick={this.props.onCopy}>
                        <ContentCopy />
                    </IconButton>}
                {this.props.onPaste &&
                    <IconButton disabled={!this.props.enablePaste} onClick={this.props.onPaste}>
                        <ContentPaste />
                    </IconButton>}
                {this.props.onMove &&
                    <IconButton disabled={!this.props.enableMove} onClick={this.props.onMove}>
                        <ImportExport />
                    </IconButton>}
                {this.props.onDelete &&
                    <IconButton disabled={!this.props.enableDelete} onClick={this.props.onDelete}>
                        <Delete />
                    </IconButton>}
                {this.props.onDownload &&
                    <IconButton disabled={!this.props.enableDownload} onClick={this.props.onDownload}>
                        <Download />
                    </IconButton>}
                {this.props.onUpload ? (
                    this.enableUpload ?
                        <Badge badgeContent={this.uploadCount} color="default">
                            <IconButton onClick={this.props.onUpload}>
                                <Upload />
                            </IconButton>
                        </Badge> :
                        <IconButton disabled={true}>
                            <Upload />
                        </IconButton>
                ) : null}
                <Hidden smDown={true}>
                    <div style={{ marginRight: "0px", marginLeft: "auto" }}>
                        <img src="../assets/VintageRevolutionLogoText.jpg" alt="logo" style={{ height: "62px" }} />
                    </div>
                </Hidden>
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
}