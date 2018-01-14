import * as React from "react";
import { IconButton } from "material-ui";
import ChevronRight from "material-ui-icons/ChevronRight";

import ApplicationToolbar from "./ApplicationToolbar";
import { SelectAllButton, SelectAllButtonProps, SelectAllButtonEvents } from "./SelectAllButton";

export interface LocalPresetToolbarProps {
    enableCopy: boolean;
 }
export interface LocalPresetToolbarEvents {
    onCopy(): void;
}

export type LocalPresetToolbarAllProps = 
    LocalPresetToolbarEvents & LocalPresetToolbarProps & SelectAllButtonProps & SelectAllButtonEvents;

export class LocalPresetToolbar extends React.Component<LocalPresetToolbarAllProps> {
    public render() {
        return (
            <ApplicationToolbar>
                <SelectAllButton
                    enableSelectAll={this.props.enableSelectAll}
                    valueSelectAll={this.props.valueSelectAll}
                    onSelectAll={this.props.onSelectAll}
                />
                <IconButton 
                    style={{ position: "absolute", top: 10, right: 20}} 
                    disabled={!this.props.enableCopy}
                    onClick={() => this.props.onCopy()}
                >
                    <ChevronRight />
                </IconButton>
            </ApplicationToolbar>
        );
    }
}