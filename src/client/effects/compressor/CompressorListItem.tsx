import * as React from "react";
import { Typography } from "@material-ui/core";

import { Compressor } from "./Compressor";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";

type CompressorListItemProps = {
    compressor: Compressor;
};
type CompressorListItemActions = ChangeEffects;
type CompressorListItemAllProps = CompressorListItemProps & CompressorListItemActions;
type CompressorListItemState = {};

export class CompressorListItem extends React.Component<CompressorListItemAllProps, CompressorListItemState> {
    constructor(props: CompressorListItemAllProps) {
        super(props);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.compressor.enabled}
                title="Compressor"
                avatar="C"
                onEnabled={this.toggleEnabled}
                settingsSummary={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const partial: Partial<Compressor> = { enabled: !this.props.compressor.enabled };
        this.props.changeEffects({ compressor: partial });
    }
}