import * as React from "react";
import { Dialog, List, ListItem, ListItemText, Slide, AppBar, Toolbar, IconButton } from "material-ui";
import CloseIcon from "material-ui-icons/Close";

// @ts-ignore: no d.ts available
import SplitterLayout from "react-splitter-layout";

export interface TargetPresetsScreenProps { 
    open: boolean;
}
export interface TargetPresetsScreenState { 
    open: boolean;
}

const Transition =(props) => {
    return <Slide direction="up" {...props} />;
};

export class TargetPresetsScreen extends React.Component<TargetPresetsScreenProps, TargetPresetsScreenState> {
    public constructor(props: TargetPresetsScreenProps) {
        super(props);
        this.state = { open: false };
    }

    public render(): React.ReactNode {
        return (
            <Dialog
                fullScreen={true}
                open={this.state.open}
                onClose={() => this.close()}
                transition={Transition}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton color="contrast" onClick={() => this.close()} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SplitterLayout  primaryIndex={1} primaryMinSize={200} secondaryMinSize={160}>
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

    public componentWillReceiveProps(newProps: TargetPresetsScreenProps) {
        this.setState({ open: newProps.open });
    }

    private close() {
        this.setState({open: false});
    }
}