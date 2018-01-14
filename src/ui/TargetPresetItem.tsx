import * as React from "react";
import { ExpansionPanel, Typography, Button,
    ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from "material-ui";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";

import TargetPreset from "./TargetPreset";

export interface TargetPresetItemProps {
    preset: TargetPreset;
 }

export class TargetPresetItem extends React.Component<TargetPresetItemProps> {
    public render(): React.ReactNode {
        return (
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Source Preset and overview</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Select Target Preset here...
                    </Typography>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button>Dummy</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }
}