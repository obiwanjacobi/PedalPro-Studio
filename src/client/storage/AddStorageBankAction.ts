export interface AddStorageBankAction {
    readonly type: "C/storage/*";
}

export const createAddStorageBankAction = (): AddStorageBankAction => {
    return { type: "C/storage/*" };
};

export interface AddStorageBank {
    addStorageBank(): void;
}