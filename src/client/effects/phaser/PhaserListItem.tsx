import * as React from "react";
import { Typography } from "@material-ui/core";

import { Phaser } from "./Phaser";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";

type PhaserListItemProps = {
    phaser: Phaser;
};
type PhaserListItemActions = ChangeEffects;
type PhaserListItemAllProps = PhaserListItemProps & PhaserListItemActions;
type PhaserListItemState = {};

export class PhaserListItem extends React.Component<PhaserListItemAllProps, PhaserListItemState> {
    constructor(props: PhaserListItemAllProps) {
        super(props);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.phaser.enabled}
                title="Phaser"
                avatar="Phr"
                onEnabled={this.toggleEnabled}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const partial: Partial<Phaser> = { enabled: !this.props.phaser.enabled };
        this.props.changeEffects({ phaser: partial });
    }
}