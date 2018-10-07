import * as React from "react";

import { Compressor } from "./Compressor";
import { ChangeEffects } from "../ChangeEffectsAction";
import { Grid, Typography } from "@material-ui/core";
import { PercentSlider } from "../PercentSlider";
import { Percent } from "../../../model/Types";
import { CompressorAttackOptions } from "./CompressorAttackOptions";
import { CompressorReleaseOptions } from "./CompressorReleaseOptions";
import { CompressorAttackTime, CompressorReleaseTime, CompressorModelType } from "../../../model/Compressor";
import { CompressorTypeOptions } from "./CompressorTypeOptions";

type CompressorSettingsProps = {
    compressor: Compressor;
};
type CompressorSettingsActions = ChangeEffects;
type CompressorSettingsAllProps = CompressorSettingsProps & CompressorSettingsActions;
type CompressorSettingsState = {};

export class CompressorSettings extends React.Component<CompressorSettingsAllProps, CompressorSettingsState> {

    public constructor(props: CompressorSettingsAllProps) {
        super(props);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeSensitivity = this.onChangeSensitivity.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeAttack = this.onChangeAttack.bind(this);
        this.onChangeRelease = this.onChangeRelease.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Compressor</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <CompressorTypeOptions
                        type={this.props.compressor.model} 
                        onChange={this.onChangeModel}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Sensitivity" 
                        value={this.props.compressor.sensitivity} 
                        onChange={this.onChangeSensitivity}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Level" 
                        value={this.props.compressor.level} 
                        onChange={this.onChangeLevel}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <CompressorAttackOptions
                        attack={this.props.compressor.attack} 
                        onChange={this.onChangeAttack}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <CompressorReleaseOptions
                        release={this.props.compressor.release} 
                        onChange={this.onChangeRelease}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeModel(model: CompressorModelType) {
        this.props.changeEffects({ compressor: { model: model } });
    }

    private onChangeSensitivity(sensitivity: Percent) {
        this.props.changeEffects({ compressor: { sensitivity: sensitivity } });
    }

    private onChangeLevel(level: Percent) {
        this.props.changeEffects({ compressor: { level: level } });
    }

    private onChangeAttack(attack: CompressorAttackTime) {
        this.props.changeEffects({ compressor: { attack: attack } });
    }

    private onChangeRelease(release: CompressorReleaseTime) {
        this.props.changeEffects({ compressor: { release: release } });
    }
}
