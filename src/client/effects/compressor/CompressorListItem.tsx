import * as React from "react";
import { Typography } from "@material-ui/core";

import { Compressor } from "./Compressor";

type CompressorListItemProps = {
    compressor: Compressor;
};
type CompressorListItemAllProps = CompressorListItemProps;
type CompressorListItemState = {};

export class CompressorListItem extends React.Component<CompressorListItemAllProps, CompressorListItemState> {
    public render() {
        if (this.props.compressor.enabled) {
            return (
                <Typography>Compressor Enabled</Typography>
            );
        } else {
            return (
                <Typography>Compressor Disabled</Typography>
            );
        }
    }
}