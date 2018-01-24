/// <reference types="react" />
import * as React from "react";
export interface SelectAllButtonProps {
    enableSelectAll: boolean;
    valueSelectAll: number;
}
export interface SelectAllButtonEvents {
    onSelectAll(): void;
}
export declare type SelectAllButtonAllProps = SelectAllButtonProps & SelectAllButtonEvents;
export declare class SelectAllButton extends React.PureComponent<SelectAllButtonAllProps> {
    constructor(props: SelectAllButtonAllProps);
    render(): JSX.Element;
    private fireSelectAll();
    private readonly selected;
    private readonly selectedSome;
}
