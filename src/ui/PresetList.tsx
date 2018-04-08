import * as React from "react";
import { Index, List, AutoSizer, ListRowProps } from "react-virtualized";

import { PresetListItem } from "./PresetListItem";
import { Preset } from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetListProps {
    presets: Preset[];
    empty: React.ReactNode;
}
export type PresetListActions = SelectPresets & Partial<EditPreset> & Partial<MovePreset>;
export interface PresetListState { }

export type PresetListAllProps = PresetListProps & PresetListActions;

const itemHeightCollapsed = 48;
const itemHeightExpanded = 96;
const itemPadding = 2;

const containerStyles: React.CSSProperties = {
    flexGrow: 1
};
const listStyles: React.CSSProperties = {
    boxSizing: "border-box"
};
const rowStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    boxSizing: "border-box"
};
const cellStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "inline-flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: itemPadding
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

    public select<T>(items: T[], rowIndex: number): T[] {
        const index = rowIndex * this.numberOfCols;
        return items.slice(index, index + this.numberOfCols);
    }
}

export class PresetList extends React.Component<PresetListAllProps, PresetListState> {
    private grid:  GridCalc;
    private virtualList: List;

    public constructor(props: PresetListAllProps) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.getRowHeight = this.getRowHeight.bind(this);
        this.refVirtualList = this.refVirtualList.bind(this);
        this.renderNoRows = this.renderNoRows.bind(this);
    }

    public shouldComponentUpdate(nextProps: PresetListAllProps, _: PresetListState): boolean {
        return this.props.presets !== nextProps.presets;
    }

    public render(): React.ReactNode {
        if (!this.props.presets) { return <div />; }

        return (
            <div id="PresetList" style={containerStyles}>
                <AutoSizer>
                    {({height, width}) => {
                        this.grid = new GridCalc(this.props.presets.length, width);

                        if (this.virtualList &&
                            this.virtualList.props.rowCount > 0 && 
                            this.props.presets.length > 0) {
                            // assume that when we get here, there was reason to rerender.
                            // virtualized list has to be kicked to rerender.
                            this.virtualList.recomputeRowHeights();
                        }

                        return (
                            <List
                                ref={this.refVirtualList}
                                style={listStyles}
                                height={height}
                                width={width}
                                rowCount={this.grid.rowCount}
                                rowHeight={this.getRowHeight}
                                rowRenderer={this.renderRow}
                                noRowsRenderer={this.renderNoRows}
                                overscanRowCount={10}
                            />
                            );
                        }}
                </AutoSizer>
            </div>
        );
    }

    private refVirtualList(virtualList: List) {
        this.virtualList = virtualList;
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
        return this.grid.select(this.props.presets, rowIndex);
    }

    private getRowHeight(rowIndex: Index): number {
        const cellData = this.getRowData(rowIndex.index);
        const nakedHeight = 
            cellData.some((preset: Preset) => preset.uiExpanded) ? itemHeightExpanded : itemHeightCollapsed;
        return nakedHeight + itemPadding;
    }

    private renderCell(preset: Preset) {
        if (!preset) { return null; }
        const style = { ...cellStyles, width: this.grid.colWidth };

        return (
            <div key={preset.index} style={style}>
                <PresetListItem
                    preset={preset}
                    selectPresets={this.props.selectPresets}
                    editPreset={this.props.editPreset}
                    movePreset={this.props.movePreset}
                />
            </div>
        );
    }

    private renderNoRows() {
        return (
            <div style={{...containerStyles, textAlign: "center"}}>
                {this.props.empty}
            </div>
        );
    }
}