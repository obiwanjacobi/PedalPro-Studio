import * as React from "react";
import {
    IconButton, Dialog, Button
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { Title } from "../controls/Title";

export interface EffectPageAllProps { }
export interface EffectPageState { }

export class EffectPage extends React.Component<EffectPageAllProps, EffectPageState> {
    public render() {
        return (
            <Dialog open={true} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton>
                        <Clear />
                    </IconButton>
                    <Title caption="Edit Preset Effects" prelude="" />
                    <Button>
                        Save
                    </Button>
                </ApplicationToolbar>
            </Dialog>
        );
    }
}