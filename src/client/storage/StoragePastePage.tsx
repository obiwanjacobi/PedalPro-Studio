import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import {
    FormControlLabel, Select, MenuItem,
    Grid, IconButton, Checkbox, Dialog, Typography, Button
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { fulfillPromise } from "../../PromiseExtensions";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { ItemUI } from "../ItemUI";
import { Preset } from "../preset/Preset";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { PreviewList } from "../preset/PreviewList";
import { NotFoundPreset } from "../preset/PreviewListItem";
import { SourcePresetList } from "../preset/SourcePresetList";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ScreenState } from "../screen/ScreenState";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { SelectedView } from "../controls/SelectedView";
import { Title } from "../controls/Title";
import { StorageBank } from "./StorageBank";
import { LoadStorageBankPresets, dispatchLoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";
import { bankNeedsLoading, storagePresetsForBank } from "./BankOperations";
import { PasteStoragePresets, createPasteStoragePresetsAction } from "./PasteStoragePresetsAction";

export interface StoragePastePageProps {
}
export interface StoragePastePageState {
    removeSelected: boolean;
    targetBank: string;
}
export interface StoragePastePageStateProps {
    open: boolean;
    clipboard: Preset[];
    presets: Preset[];
    banks: StorageBank[];
}
export type StoragePastePageActions = ChangePresets & PasteStoragePresets & UpdateScreen & LoadStorageBankPresets;
export type StoragePastePageAllProps = StoragePastePageProps & StoragePastePageStateProps & StoragePastePageActions;

const Styles = {
    MainColumn: { padding: "8px" }
};

export class StoragePastePage extends React.Component<StoragePastePageAllProps, StoragePastePageState> {
    private selection: SelectedView<Preset>;

    public constructor(props: StoragePastePageAllProps) {
        super(props);
        this.selection = new SelectedView(props.clipboard);

        this.state = { removeSelected: true, targetBank: "" };
        this.close = this.close.bind(this);
        this.pastedPresets = this.pastedPresets.bind(this);
        this.onBankChange = this.onBankChange.bind(this);
        this.onRemoveSelectedChange = this.onRemoveSelectedChange.bind(this);
        this.pasteAndClose = this.pasteAndClose.bind(this);
    }

    public componentWillReceiveProps(newProps: StoragePastePageAllProps) {
        this.selection = new SelectedView(newProps.clipboard);
    }

    public render() {
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    <Title caption="Paste Presets" pre="STORAGE - " />
                    <Button onClick={this.pasteAndClose} disabled={this.hasResult}>
                        Paste
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
                        <Typography variant="body2">Storage Bank</Typography>
                        <Select value={this.state.targetBank} onChange={this.onBankChange}>
                            {this.props.banks.map((bank: StorageBank, index: number) => {
                                return (
                                    <MenuItem key={index} value={bank.name}>
                                        <Typography>{bank.name}</Typography>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                    <Grid item={true} xs={4} container={true} direction="column" style={Styles.MainColumn}>
                        <Typography variant="body2">Pasted Preview</Typography>
                        <PreviewList items={this.pastedPresets()} />
                    </Grid>
                </Grid>
            </Dialog>
        );
    }

    private get hasResult(): boolean {
        return this.pastedPresets().filter((p: Preset) => p !== NotFoundPreset).length === 0;
    }

    private onRemoveSelectedChange() {
        this.setState({ removeSelected: !this.state.removeSelected });
    }

    private onBankChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const name = event.target.value;
        this.setState({ targetBank: name });

        const bank = this.props.banks.find(b => b.name === name);
        if (bankNeedsLoading(bank)) {
            this.props.loadStorageBankPresets(name);
        }
    }

    private pastedPresets(): Preset[] {
        if (this.state.targetBank.length === 0) { return []; }

        const bankPreset =
            storagePresetsForBank(this.props.presets, this.state.targetBank)
                .sort((p1, p2) => p1.index - p2.index);

        const index = bankPreset.length ? bankPreset[bankPreset.length - 1].index + 1 : 0;
        return this.selection.selected.map(
            (cp, i) => {
                return {
                    ...cp,
                    index: index + i,
                    group: { name: this.state.targetBank, originName: cp.group ? cp.group.originName : "" },
                    ui: { ...cp.ui, selected: false }
                };
            }
        );
    }

    private close() {
        this.props.updateScreen({ pasteOpen: false });
    }

    private pasteAndClose() {
        this.props.pasteStoragePresets(this.pastedPresets(), this.state.removeSelected);
        this.close();
    }
}

const extractComponentPropsFromState: MapStateToProps<
    StoragePastePageStateProps, StoragePastePageProps, ApplicationDocument
    > = (state: ApplicationDocument, _: StoragePastePageProps): StoragePastePageStateProps => {
        return {
            banks: state.banks || [],
            presets: state.storage,
            clipboard: state.clipboard,
            open: state.screen.pasteOpen
        };
    };

const createActionObject: MapDispatchToPropsFunction<StoragePastePageActions, StoragePastePageProps> =
    (dispatch: Dispatch, _: StoragePastePageProps): StoragePastePageActions => {
        return {
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
            },
            pasteStoragePresets: (presets: Preset[], deleteAfterPaste: boolean): void => {
                dispatch(createPasteStoragePresetsAction(presets, deleteAfterPaste));
            },
            updateScreen: (state: Partial<ScreenState>): void => {
                dispatch(createUpdateScreenAction(state));
            },
            loadStorageBankPresets: (bank: string): void => {
                fulfillPromise(dispatchLoadStorageBankPresetsAction(dispatch, bank));
            }
        };
    };

export default connect(extractComponentPropsFromState, createActionObject)(StoragePastePage);