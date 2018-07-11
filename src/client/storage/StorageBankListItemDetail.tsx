import * as React from "react";
import { Grid, IconButton, Input, InputAdornment } from "@material-ui/core";
import { Delete, Save, Undo } from "@material-ui/icons";

import { StorageBank } from "./StorageBank";
import { RenameStorageBank } from "./RenameStorageBankAction";
import { DeleteStorageBank } from "./DeleteStorageBankAction";

export interface StorageBankListItemDetailProps { 
    bank: StorageBank;
}
export type StorageBankListItemDetailActions = RenameStorageBank & DeleteStorageBank;
export interface StorageBankListItemDetailState {
    name: string;
}

export type StorageBankListItemDetailAllProps = StorageBankListItemDetailProps & StorageBankListItemDetailActions;

export class StorageBankListItemDetail extends 
    React.Component<StorageBankListItemDetailAllProps, StorageBankListItemDetailState> {

    constructor(props: StorageBankListItemDetailAllProps) {
        super(props);
        this.state = { name: props.bank.name };
        // bind event handlers
        this.updateNameHandler = this.updateNameHandler.bind(this);
        this.undoName = this.undoName.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    public shouldComponentUpdate(
        nextProps: StorageBankListItemDetailAllProps, nextState: StorageBankListItemDetailState): boolean {
        return this.props.bank !== nextProps.bank || 
            this.state.name !== nextState.name;
    }

    public componentWillReceiveProps(
        nextProps: StorageBankListItemDetailAllProps, _: StorageBankListItemDetailState) {
        this.setState({ name: nextProps.bank.name });
    }

    public render(): React.ReactNode {
        return (
            <Grid container={true} justify="flex-end">
                <Grid item={true} xs={1}/>
                <Grid item={true} xs={6}>
                    <Input
                        style={{width: 180}}
                        placeholder="Bank Name"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.updateNameHandler}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton 
                                    disabled={!this.canUndo}
                                    onClick={this.undoName}
                                >
                                    <Undo />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item={true} xs={1}/>
                <Grid item={true} xs={3}>
                    <div style={{width: 100}}>
                        <IconButton 
                            color="secondary"
                            disabled={!this.canSave}
                            onClick={this.save}
                        >
                            <Save />
                        </IconButton>
                        <IconButton 
                            disabled={!this.canDelete}
                            onClick={this.delete}
                        >
                            <Delete />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item={true} xs={1}>
                    <div style={{width: 30}} />
                </Grid>
                <Grid item={true} xs={12} />
            </Grid>         
        );
    }

    private get canSave(): boolean {
        return this.state && 
            this.state.name.length > 0 &&
            this.state.name !== this.props.bank.name;
    }

    private get canUndo(): boolean {
        if (!this.state) { return false; }

        return this.state.name !== this.props.bank.name ||
            this.state.name !== this.props.bank.origin.name;
    }

    private get canDelete(): boolean {
        return true;
    }

    private updateNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.updateName(e.target.value);
    }

    private updateName(name: string) {
        this.setState({ name: name });
    }

    private undoName() {
        this.updateName(this.props.bank.origin.name);
    }

    private save() {
        this.props.renameStorageBank(this.props.bank, this.state.name);
    }

    private delete() {
        // TODO: confirm
        this.props.deleteStorageBank(this.props.bank.name);
    }
}