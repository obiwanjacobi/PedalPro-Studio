export interface AddBankAction {
    readonly type: "C/storage/*";
}

export const createAddBankAction = (): AddBankAction => {
    return { type: "C/storage/*" };
};

export interface AddBank {
    addBank(): void;
}