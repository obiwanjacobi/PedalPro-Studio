// tslint:disable-next-line
export const makeObject = (self: {}): any => {
    return Object.assign({}, self);
};

export const toBool = (value?: boolean ): boolean => {
    return value ? value : false;
};

export const getTypeName = (instance: {}): string => {
    // tslint:disable-next-line
    return (instance as any).constructor.name;
};
