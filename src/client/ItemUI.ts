export interface ItemWithUI {
    ui: ItemUI;
}

export interface ItemUI {
    /**
     * true when the item is selected in the ui.
     */
    selected: boolean;

    /**
     * true when the item is expanded in the ui.
     */
    expanded: boolean;

    /**
     * true when the item was marked as deleted (empty).
     */
    markedDeleted: boolean;
}

export const itemUiModify = (itemUi: ItemUI, update: Partial<ItemUI>): ItemUI => {
    return { ...itemUi, ...update };
};
