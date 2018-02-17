import * as React from "react";
import { Grid } from "material-ui";
import { Index, Table, Column, TableCellDataGetterParams, TableCellProps, AutoSizer } from "react-virtualized";

import PresetListItem from "./PresetListItem";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListProps {
    presets: Preset[];
    filter: string;
}
export type PresetListActions = SelectPresets & EditPreset & MovePreset;
export interface PresetListState { }

export type PresetListAllProps = PresetListProps & PresetListActions;

const styles = {
    hidden: {
        display: "none"
    }
};

class GridCalc {
    private widthTotal: number;
    private countTotal: number;
    private numberOfCols: number;
    private numberOfRows: number;
    private col: number;
    private arr: Array<number>;

    constructor(itemCount: number, width: number) {
        this.countTotal = itemCount;
        this.widthTotal = width;

        this.numberOfCols =  Math.floor(this.widthTotal / 340);
        if (this.numberOfCols <= 1) { this.numberOfCols = 1; }
        this.col = Math.floor(this.widthTotal / this.numberOfCols);
        this.numberOfRows = this.countTotal / this.numberOfCols;

        this.arr = new Array<number>(this.numberOfCols);
        for (let i = 0; i < this.numberOfCols; i++) {
            this.arr[i] = this.col;
        }
    }

    public get colCount(): number {
        return this.numberOfCols;
    }

    public get rowCount(): number {
        return this.numberOfRows;
    }

    public get colWidth(): number {
        return this.col;
    }

    public get columns(): Array<number> {
        return this.arr;
    }

    public toRowIndex(index: number): number {
        return index * this.numberOfCols;
    }
}

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    private grid:  GridCalc;

    public constructor(props: PresetListAllProps) {
        super(props);
        this.renderCell = this.renderCell.bind(this);
        this.getRow = this.getRow.bind(this);
    }

    public shouldComponentUpdate(nextProps: PresetListAllProps, _: PresetListState): boolean {
        return this.props.presets !== nextProps.presets || 
            this.props.filter !== nextProps.filter;
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div />; }

        return (
            <div style={{height: "100%"}}>
                <AutoSizer>
                    {({height, width}) => {
                        this.grid = new GridCalc(this.props.presets.length, width);

                        return (
                            <Table 
                                disableHeader={true}
                                headerHeight={0}
                                overscanRowCount={7}
                                rowCount={this.grid.rowCount}
                                rowGetter={this.getRow}
                                height={height}
                                width={width}
                                rowHeight={80}
                            >
                                {this.grid.columns.map((value: number, index: number) => 
                                    this.renderColumn(index, value))}
                            </Table>
                            );
                        }}
                </AutoSizer>
            </div>
        );
    }

    private renderColumn(colIndex: number, width: number) {
        return (
            <Column
                key={colIndex}
                dataKey={colIndex}
                width={width}
                cellRenderer={this.renderCell}
                cellDataGetter={this.getCellData}
            />
        );
    }

    private getCellData(params: TableCellDataGetterParams) {
        return params.rowData[params.dataKey];
    }

    private getRow(info: Index) {
        const index = this.grid.toRowIndex(info.index);
        return this.props.presets.slice(index, this.grid.colCount);
    }

    private renderCell(props: TableCellProps) {
        if (!props.cellData) return  null;

        return (
            <div>{props.cellData.name}</div>
            // <PresetListItem
            //     preset={props.cellData}
            //     selectPresets={this.props.selectPresets}
            //     editPreset={this.props.editPreset}
            //     movePreset={this.props.movePreset}
            // />
        );
    }

    // public render(): React.ReactNode {
    //     if (!this.props.presets) { return <div />; }

    //     return ( 
    //         <Grid container={true}>
    //                 {this.props.presets.map(
    //                     (preset: Preset) => this.presetSummary(preset)
    //                 )}
    //         </Grid>
    //     );
    // }

    // private presetSummary(preset: Preset): React.ReactNode {
    //     return (
    //         <Grid 
    //             xs={12} 
    //             sm={6} 
    //             md={4} 
    //             lg={3} 
    //             xl={2} 
    //             item={true} 
    //             key={preset.index}
    //             style={!this.isVisible(preset) ? styles.hidden : {}}
    //         >
    //             <PresetListItem
    //                 preset={preset}
    //                 selectPresets={this.props.selectPresets}
    //                 editPreset={this.props.editPreset}
    //                 movePreset={this.props.movePreset}
    //             />
    //         </Grid>
    //     );
    // }

    private isVisible(preset: Preset): boolean {
        if (!this.props.filter || this.props.filter.length === 0) {
            return true;
        }
        return preset.name.toUpperCase().search(this.props.filter.toUpperCase()) >= 0;
    }
}