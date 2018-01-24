/// <reference types="react" />
import * as React from "react";
export interface PresetScreenProps {
}
export interface PresetScreenState {
    selectedTab: number;
}
export default class PresetScreen extends React.PureComponent<PresetScreenProps, PresetScreenState> {
    constructor(props: PresetScreenProps);
    render(): React.ReactNode;
    private changePageHandler(_, value);
    private readonly selectedTab;
    private readonly activeCollection;
    private activatePage(index);
}
