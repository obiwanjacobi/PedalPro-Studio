import * as React from "react";
import { Typography } from "@material-ui/core";

import { Compressor } from "./Compressor";
import { EffectsItemCard } from "../EffectsItemCard";

type CompressorListItemProps = {
    compressor: Compressor;
};
type CompressorListItemAllProps = CompressorListItemProps;
type CompressorListItemState = {};

export class CompressorListItem extends React.Component<CompressorListItemAllProps, CompressorListItemState> {
    constructor(props: CompressorListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.compressor.enabled}
                title="Compressor"
                avatar="C"
                onEnabled={this.onEnabled}
                settingsSummary={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private onEnabled() {

    }
}