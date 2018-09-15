import * as React from "react";

import { EffectsEx } from "../../model/Effects";
import { CompressorListItem } from "./compressor/CompressorListItem";

type EffectsExListProps = {
    effectsEx: EffectsEx;
};
type EffectsExListAllProps = EffectsExListProps;
type EffectsExListState = {};

export class EffectsExList extends React.Component<EffectsExListAllProps, EffectsExListState> {
    public render() {
        return (
            <CompressorListItem compressor={this.props.effectsEx.compressor} />
        );
    }
}