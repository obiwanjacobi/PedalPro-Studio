export const AddBankActionKey: string = "C/storage/*";

export interface AddBankAction {
    readonly type: "C/storage/*";
}

export const createAddBankAction = (): AddBankAction => {
    return <AddBankAction> { 
        type: AddBankActionKey, 
    };
};

export interface AddBank {
    addBank(): void;
}