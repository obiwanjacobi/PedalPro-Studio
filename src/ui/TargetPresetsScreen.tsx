import * as React from "react";
import { Dialog, List, ListItem, ListItemText, Slide, AppBar, Toolbar, IconButton } from "material-ui";
import CloseIcon from "material-ui-icons/Close";
// @ts-ignore: no d.ts available
import SplitterLayout from "react-splitter-layout";

import { UpdateScreen } from "../client/UpdateScreenAction";
import { ScreenState } from "../client/ApplicationDocument";

export interface TargetPresetsScreenProps { 
    open: boolean;
}
export type TargetPresetsScreenAction = UpdateScreen;

export type TargetPresetsScreenAllProps = TargetPresetsScreenProps & TargetPresetsScreenAction;

// @ts-ignore: copy paste from inet
const Transition = (props) => {
    return <Slide direction="up" {...props} />;
};

export class TargetPresetsScreen extends React.Component<TargetPresetsScreenAllProps> {
    public render(): React.ReactNode {
        return (
            <Dialog
                fullScreen={true}
                open={this.props.open}
                onClose={() => this.close()}
                transition={Transition}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton onClick={() => this.close()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SplitterLayout primaryIndex={0} primaryMinSize={200} secondaryMinSize={160}>
                    <List>
                        <ListItem>
                            <ListItemText primary="Left..." />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <ListItemText primary="Right..." />
                        </ListItem>
                    </List>
                </SplitterLayout>
            </Dialog>
        );
    }

    private close() {
        this.props.updateScreen(new ScreenState(false));
    }
}