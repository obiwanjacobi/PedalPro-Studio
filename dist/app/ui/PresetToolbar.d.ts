/// <reference types="react" />
import * as React from "react";
import { SelectAllButtonProps, SelectAllButtonEvents } from "./SelectAllButton";
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
export declare type PresetToolbarAllProps = PresetToolbarEvents & PresetToolbarProps & SelectAllButtonProps & SelectAllButtonEvents;
export declare class PresetToolbar extends React.PureComponent<PresetToolbarAllProps> {
    constructor(props: PresetToolbarAllProps);
    render(): JSX.Element;
    private fireCopy();
    private fireDownload();
    private fireUpload();
}
