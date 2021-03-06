import * as React from "react";
import { Index, List, AutoSizer, ListRowProps } from "react-virtualized";
import { Typography } from "@material-ui/core";

const itemPadding = 2;

const containerStyles: React.CSSProperties = {
    flexGrow: 1,
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

export interface GridCalculator<T> {
    /**
     * Sets the items that are passed to the list.
     * Use for total number of items and impl. of select
     */
    items: T[];
    /**
     * Sets the width of the list during render.
     * Use to calc number and width of columns
     */
    width: number;
    /**
     * Gets number of columns
     */
    columnCount: number;
    /**
     * Gets total number of rows
     */
    rowCount: number;
    /**
     * Gets the width of a single column
     */
    columnWidth: number;
    /**
     * Returns the list data items for a specific row
     * @param rowIndex The index of the row.
     */
    select(rowIndex: number): T[];
}

export class GridCalc<T> implements GridCalculator<T> {
    public items: T[];
    public width: number;

    public get columnCount(): number {
        const numberOfCols =  Math.floor(this.width / 340);
        if (numberOfCols < 1) { return 1; }
        return numberOfCols;
    }

    public get rowCount(): number {
        return Math.ceil(this.items.length / this.columnCount);
    }

    public get columnWidth(): number {
        return Math.floor(this.width / this.columnCount);
    }

    public select(rowIndex: number): T[] {
        const cols = this.columnCount;
        const index = rowIndex * cols;
        return this.items.slice(index, index + cols);
    }
}

export interface VirtualListProps<T> {
    items: T[];
}

export abstract class VirtualList<T, P extends VirtualListProps<T>, S> extends React.Component<P, S> {

    private grid: GridCalculator<T>;
    private virtualList: List;

    protected constructor(props: P) {
        super(props);
        this.grid = this.createGridCalculator();

        this.renderRow = this.renderRow.bind(this);
        this.getRowHeight = this.getRowHeight.bind(this);
        this.refVirtualList = this.refVirtualList.bind(this);
        this.renderEmpty = this.renderEmpty.bind(this);
    }

    protected createGridCalculator(): GridCalculator<T> {
        return new GridCalc<T>();
    }

    public shouldComponentUpdate(nextProps: VirtualListProps<T>, _: S): boolean {
        const update = this.props.items !== nextProps.items;
        return update;
    }

    public render(): React.ReactNode {
        if (!this.props.items) { return null; }

        return (
            <div id="VirtualList" style={containerStyles}>
                <AutoSizer>
                    {({height, width}) => {
                        this.grid.width = width;
                        this.grid.items = this.props.items;

                        if (this.virtualList &&
                            this.virtualList.props.rowCount > 0 && 
                            this.props.items.length > 0) {
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
                                noRowsRenderer={this.renderEmpty}
                                overscanRowCount={10}
                            />
                            );
                        }}
                </AutoSizer>
            </div>
        );
    }

    protected calcRowHeight(_: T[]): number {
        return 60;
    }

    protected renderItem(item: T): React.ReactNode {
        return (
            <div>
                {item}
            </div>
        );
    }

    protected renderEmpty() {
        return (
            <div style={{...containerStyles, textAlign: "center"}}>
                <Typography variant="body2">No items.</Typography>
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
            const key = (listRowProps.index * i) + listRowProps.index + i;
            const cell = this.renderCell(cellData[i], key);
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

    private getRowData(rowIndex: number): T[] {
        return this.grid.select(rowIndex);
    }

    private getRowHeight(rowIndex: Index): number {
        const cellData = this.getRowData(rowIndex.index);
        const nakedHeight = this.calcRowHeight(cellData);
        return nakedHeight + itemPadding;
    }

    private renderCell(item: T, key: number) {
        if (!item) { return null; }
        const style = { ...cellStyles, width: this.grid.columnWidth };

        return (
            <div key={key} style={style}>
                {this.renderItem(item)}
            </div>
        );
    }
}