import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    FormControl, FormControlLabel, RadioGroup, Radio,
    Grid, IconButton, Checkbox, Dialog, Typography, Button
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../preset/Preset";
import { ItemUI } from "../ItemUI";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../preset/PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { ScreenState } from "../screen/ScreenState";
import { SelectedView } from "../controls/SelectedView";
import { PreviewList } from "../preset/PreviewList";
import { NotFoundPreset } from "../preset/PreviewListItem";
import { SourcePresetList } from "../preset/SourcePresetList";
import { Title } from "../controls/Title";

enum PasteType {
    None = "none",
    Index = "index",
    Name = "name",
    Empty = "empty"
}

export interface DevicePastePageProps { }
export interface DevicePastePageState {
    pasteType: string;
    removeSelected: boolean;
}
export interface DevicePastePageStateProps {
    open: boolean;
    clipboard: Preset[];
    presets: Preset[];
}
export type DevicePastePageActions = ChangePresets & PastePresets & UpdateScreen;
export type DevicePastePageAllProps = DevicePastePageProps & DevicePastePageStateProps & DevicePastePageActions;

const Styles = {
    MainColumn: { padding: "8px" }
};

export class DevicePastePage extends React.Component<DevicePastePageAllProps, DevicePastePageState> {
    private selection: SelectedView<Preset>;

    public constructor(props: DevicePastePageAllProps) {
        super(props);
        this.selection = new SelectedView(props.clipboard);

        this.state = { pasteType: PasteType.None, removeSelected: true };
        this.close = this.close.bind(this);
        this.onPasteTypeChange = this.onPasteTypeChange.bind(this);
        this.onRemoveSelectedChange = this.onRemoveSelectedChange.bind(this);
        this.overwrite = this.overwrite.bind(this);
    }

    public componentWillReceiveProps(newProps: DevicePastePageAllProps) {
        this.selection = new SelectedView(newProps.clipboard);
    }

    public render() {
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    <Title caption="Paste Presets" sub="DEVICE" />
                    <Button onClick={this.overwrite} disabled={this.hasResult}>
                        Overwrite
                    </Button>
                </ApplicationToolbar>
                <Grid container={true} style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
                    <Grid item={true} xs={4} container={true} direction="column" style={Styles.MainColumn}>
                        <Typography variant="body2">Clipboard</Typography>
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.removeSelected}
                                onChange={this.onRemoveSelectedChange}
                            />}
                            label="Remove after Paste"
                        />
                        <SourcePresetList items={this.props.clipboard} changePresets={this.props.changePresets} />
                    </Grid>

                    <Grid item={true} xs={4} style={Styles.MainColumn}>
                        <Typography variant="body2">Operation</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup value={this.state.pasteType} onChange={this.onPasteTypeChange}>
                                <FormControlLabel
                                    value={PasteType.Index}
                                    label="Replace by Index"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    value={PasteType.Name}
                                    label="Replace by Name"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    value={PasteType.Empty}
                                    label="Replace empty"
                                    control={<Radio />}
                                />}
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item={true} xs={4} container={true} direction="column" style={Styles.MainColumn}>
                        <Typography variant="body2">Preview</Typography>
                        <PreviewList items={this.overwrittenPresets()} />
                    </Grid>
                </Grid>
            </Dialog>
        );
    }

    private get hasResult(): boolean {
        return this.overwrittenPresets().filter((p: Preset) => p !== NotFoundPreset).length === 0;
    }

    private onRemoveSelectedChange() {
        this.setState({ removeSelected: !this.state.removeSelected });
    }

    private onPasteTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ pasteType: event.target.value });
    }

    private overwrittenPresets(): Preset[] {
        switch (this.state.pasteType) {
            case PasteType.Empty:
                return this.overwrittenEmptyPresets();
            case PasteType.Index:
                return this.overwrittenPresetsByIndex();
            case PasteType.Name:
                return this.overwrittenPresetsByName();
            default:
                return [];
        }
    }

    private overwrittenEmptyPresets(): Preset[] {
        const byEmpty = new Array<Preset>(this.selection.selected.length);
        const empties = this.props.presets.filter((p: Preset) => p.traits.empty);
        this.selection.selected.forEach((p: Preset, index: number) => {
            const found = empties[index];
            byEmpty[index] = this.newPreset(p, found);
        });
        return byEmpty.fill(NotFoundPreset, byEmpty.length, this.props.clipboard.length);
    }

    private overwrittenPresetsByIndex(): Preset[] {
        const byIndex = new Array<Preset>(this.selection.selected.length);
        this.selection.selected.forEach((p: Preset, index: number) => {
            const found = this.props.presets.find((d: Preset) => d.index === p.index);
            byIndex[index] = this.newPreset(p, found);
        });
        return byIndex;
    }

    private overwrittenPresetsByName(): Preset[] {
        const byName = new Array<Preset>(this.selection.selected.length);
        this.selection.selected.forEach((p: Preset, index: number) => {
            const found = this.props.presets.find((d: Preset) => d.name === p.name);
            byName[index] = this.newPreset(p, found);
        });
        return byName;
    }

    private newPreset(source: Preset, target?: Preset): Preset {
        target = target || NotFoundPreset;
        return { ...source, index: target.index, origin: target };
    }

    private pastedPresets() {
        const overwritten = this.overwrittenPresets();
        if (overwritten.length === 0) { return overwritten; }

        const pasted = this.selection.selected.slice();

        for (let i = 0; i < pasted.length; i++) {
            pasted[i] = { ...pasted[i], index: overwritten[i].index };
        }

        return pasted;
    }

    private close() {
        this.props.updateScreen({ pasteOpen: false });
    }

    private overwrite() {
        this.props.pastePresets(this.pastedPresets(), PresetCollectionType.device, this.state.removeSelected);
        this.close();
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): DevicePastePageStateProps => {
    return {
        presets: state.device,
        clipboard: state.clipboard,
        open: state.screen.pasteOpen
    };
};

const createActionObject = (dispatch: Dispatch): DevicePastePageActions => {
    return {
        changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
            dispatch(createChangePresetsAction(presets, source, ui));
        },
        pastePresets: (presets: Preset[], target: PresetCollectionType, deleteAfterPaste: boolean): void => {
            dispatch(createPastePresetsAction(presets, target, deleteAfterPaste));
        },
        updateScreen: (state: Partial<ScreenState>): void => {
            dispatch(createUpdateScreenAction(state));
        }
    };
};

export default connect(extractComponentPropsFromState, createActionObject)(DevicePastePage);