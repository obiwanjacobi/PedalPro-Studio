import * as React from "react";
import { Grid, AppBar, Toolbar, IconButton } from "material-ui";
import ChevronRight from "material-ui-icons/ChevronRight";

export interface LocalPresetToolbarProps {
    enableCopy: boolean;
 }
export interface LocalPresetToolbarEvents { }

export type LocalPresetToolbarAllProps = LocalPresetToolbarEvents & LocalPresetToolbarProps;

export class LocalPresetToolbar extends React.Component<LocalPresetToolbarAllProps> {
    public render() {
        return (
            <AppBar position="static">
                <Toolbar disableGutters={true}>
                    <Grid container={true} direction="row" justify="flex-end">
                        <Grid item={true} xs={2} >
                            <IconButton 
                                style={{ position: "absolute", top: 10, right: 20}} 
                                disabled={!this.props.enableCopy}
                            >
                                <ChevronRight />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}