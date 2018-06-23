import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { 
    FormControlLabel, Select, MenuItem,
    Grid, IconButton, List, Checkbox, Dialog, Typography, Button 
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../preset/Preset";
import { ItemUI } from "../ItemUI";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { PastePresets, createPastePresetsAction } from "../preset/PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { SelectedView } from "../controls/SelectedView";
import { Title } from "../controls/Title";
import { SourcePresetListItem } from "../preset/SourcePresetListItem";
import { PreviewListItem, NotFoundPreset } from "../preset/PreviewListItem";
import { ScreenState } from "../screen/ScreenState";
import { StorageBank } from "./StorageBank";
import { LoadStorageBankPresets, dispatchLoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";
import { bankNeedsLoading } from "./BankOperations";

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
export type StoragePastePageActions = ChangePresets & PastePresets & UpdateScreen & LoadStorageBankPresets;
export type StoragePastePageAllProps = StoragePastePageProps & StoragePastePageStateProps & StoragePastePageActions;

export class StoragePastePage extends React.Component<StoragePastePageAllProps, StoragePastePageState> {
    private selection: SelectedView;

    public constructor(props: StoragePastePageAllProps) {
        super(props);
        this.selection = new SelectedView(props.clipboard);

        this.state = { removeSelected: false, targetBank: "" };
        this.close = this.close.bind(this);
        this.pastedPresets = this.pastedPresets.bind(this);
        this.onBankChange = this.onBankChange.bind(this);
        this.onRemoveSelectedChange = this.onRemoveSelectedChange.bind(this);
        this.overwrite = this.overwrite.bind(this);
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
                    <Title caption="Paste Presets" prelude="STORAGE - " />
                    <Button onClick={this.overwrite} disabled={this.hasResult}>
                        Paste
                    </Button>
                </ApplicationToolbar>
                <div style={{padding: 12}}>
                    <Grid container={true} spacing={8}>
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Clipboard</Typography>
                            <List id="ClipboardList">
                                {this.props.clipboard.map((preset: Preset, index: number) => {
                                    return (
                                        <SourcePresetListItem
                                            key={index} 
                                            preset={preset} 
                                            changePresets={this.props.changePresets}
                                        />
                                    );
                                })}
                            </List>
                            <FormControlLabel
                                control={<Checkbox 
                                    checked={this.state.removeSelected} 
                                    onChange={this.onRemoveSelectedChange}
                                />}
                                label="Remove after Paste"
                            />
                        </Grid>
                        <Grid item={true} xs={4}>
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
                        <Grid item={true} xs={4}>
                            <Typography variant="body2">Pasted</Typography>
                            <List id="DeviceList">
                                {this.pastedPresets().map((preset: Preset, index: number) => {
                                    return (
                                        <PreviewListItem
                                            key={index} 
                                            preset={preset}
                                            match={false}
                                        />
                                    );
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        );
    }

    private get hasResult(): boolean {
        return this.pastedPresets().filter((p: Preset) => p !== NotFoundPreset).length === 0;
    }

    private onRemoveSelectedChange() {
        this.setState({removeSelected: !this.state.removeSelected});
    }

    private onBankChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const name = event.target.value;
        this.setState({targetBank: name});
        
        const bank = this.props.banks.find(b => b.name === name);
        if (bankNeedsLoading(bank)) {
            this.props.loadStorageBankPresets(name);
        }
    }

    private pastedPresets(): Preset[] {
        if (this.state.targetBank.length === 0 || this.props.presets.length === 0) { return []; }

        const bankPreset = this.props.presets
            .filter(p => p.group && p.group.name === this.state.targetBank)
            .sort((p1, p2) => p1.index - p2.index);

        const index = bankPreset.length ? bankPreset[bankPreset.length - 1].index + 1 : 0;
        return this.selection.selected.map(
            (cp, i) => { return {
                ...cp, 
                index: index + i, 
                group: { name: this.state.targetBank, originName: cp.group ? cp.group.originName : "" }, 
                ui: { ...cp.ui, selected: false }
            }; }
        );
    }

    private close() {
        this.props.updateScreen({ pasteOpen: false });
    }

    private overwrite() {
        this.props.pastePresets(this.pastedPresets(), PresetCollectionType.storage, this.state.removeSelected);
        this.close();
    }
}

const extractComponentPropsFromState: MapStateToProps<
        StoragePastePageStateProps, StoragePastePageProps, ApplicationDocument
    > = (state: ApplicationDocument, _: StoragePastePageProps): StoragePastePageStateProps => {
        return  { 
            banks: state.banks, 
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
            pastePresets: (presets: Preset[], target: PresetCollectionType, deleteAfterPaste: boolean): void => {
                dispatch(createPastePresetsAction(presets, target, deleteAfterPaste));
            },
            updateScreen: (state: Partial<ScreenState>): void => {
                dispatch(createUpdateScreenAction(state));
            },
            loadStorageBankPresets: (bank: string): void => {
                dispatchLoadStorageBankPresetsAction(dispatch, bank);
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(StoragePastePage);