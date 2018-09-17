import * as React from "react";
import { Typography } from "@material-ui/core";

import { PreAmp } from "./PreAmp";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";

type PreAmpListItemProps = {
    pre: PreAmp;
};
type PreAmpListItemActions = ChangeEffects;
type PreAmpListItemAllProps = PreAmpListItemProps & PreAmpListItemActions;
type PreAmpListItemState = {};

export class PreAmpListItem extends React.Component<PreAmpListItemAllProps, PreAmpListItemState> {
    constructor(props: PreAmpListItemAllProps) {
        super(props);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.pre.enabled}
                title="PreAmp"
                avatar="Pre"
                onEnabled={this.toggleEnabled}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const partial: Partial<PreAmp> = { enabled: !this.props.pre.enabled };
        this.props.changeEffects({ pre: partial });
    }
}