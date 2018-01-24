export interface Selectable {
    selected: boolean;
}
/**
 * Provides common functs for a collection of selectable items.
 */
export declare class SelectedView<T extends Selectable> {
    private readonly collection;
    constructor(collection: T[]);
    readonly isEmpty: boolean;
    readonly selected: T[];
    readonly anySelected: boolean;
    readonly allSelected: boolean;
    readonly noneSelected: boolean;
    toValue(): number;
}
