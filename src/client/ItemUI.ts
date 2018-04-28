export interface ItemWithUI {
    ui: ItemUI;
}

export interface ItemUI {
    /**
     * true when the preset is selected in the ui.
     */
    selected: boolean;

    /**
     * true when the preset is expanded in the ui.
     */
    expanded: boolean;

    /**
     * true when the preset was marked as deleted (empty).
     */
    markedDeleted: boolean;
}

export const ItemUiModify = (itemUi: ItemUI, update: Partial<ItemUI>): ItemUI => {
    return { ...itemUi, ...update };
};
