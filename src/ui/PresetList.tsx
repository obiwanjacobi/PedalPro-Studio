import * as React from "react";
import { Grid } from "material-ui";
import { Index, List, AutoSizer, ListRowProps } from "react-virtualized";

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

const listStyles: React.CSSProperties = {
    boxSizing: "border-box"
};
const rowStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
};
const cellStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

class GridCalc {
    private widthTotal: number;
    private countTotal: number;
    private numberOfCols: number;
    private numberOfRows: number;
    private col: number;

    constructor(itemCount: number, width: number) {
        this.countTotal = itemCount;
        this.widthTotal = width;

        this.numberOfCols =  Math.floor(this.widthTotal / 340);
        if (this.numberOfCols <= 1) { this.numberOfCols = 1; }
        this.col = Math.floor(this.widthTotal / this.numberOfCols);
        this.numberOfRows = Math.ceil(this.countTotal / this.numberOfCols);
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
}

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    private grid:  GridCalc;

    public constructor(props: PresetListAllProps) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.getRowHeight = this.getRowHeight.bind(this);
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
                            <List
                                style={listStyles}
                                height={height}
                                width={width}
                                rowCount={this.grid.rowCount}
                                rowHeight={this.getRowHeight}
                                rowRenderer={this.renderRow}
                            />
                            );
                        }}
                </AutoSizer>
            </div>
        );
    }

    private renderRow(listRowProps: ListRowProps) {
        const cellData = this.getRowData(listRowProps.index);
        const cells = new Array<React.ReactNode>(cellData.length);
        
        for (let i = 0; i < cellData.length; i++) {
            const cell = this.renderCell(cellData[i]);
            if (cell) {
                cells.push(cell);
            }
        }

        return (
            <div key={listRowProps.key} style={{...rowStyles, ...listRowProps.style}}>
                {cells}
            </div>
        );
    }

    private getRowData(rowIndex: number): Preset[] {
        const index = rowIndex * this.grid.colCount;
        return this.props.presets.slice(index, index + this.grid.colCount);
    }

    private getRowHeight(rowIndex: Index): number {
        const cellData = this.getRowData(rowIndex.index);
        return cellData.some((preset: Preset) => preset.uiExpanded) ? 120 : 60;
    }

    private renderCell(preset: Preset) {
        if (!preset) { return null; }

        return (
            <div style={cellStyles}>
                <PresetListItem
                    preset={preset}
                    selectPresets={this.props.selectPresets}
                    editPreset={this.props.editPreset}
                    movePreset={this.props.movePreset}
                />
            </div>
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