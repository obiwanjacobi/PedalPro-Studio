export interface TypeDefaultConstructor<T> {
    new (): T;
}

export interface TypeParamsConstructor<T> {
    // tslint:disable-next-line:no-any
    new (...args: any[]): T;
}

// tslint:disable-next-line:no-any
export function isTypeOf<T>(variable: any, type: TypeDefaultConstructor<T>) {
    const template = new type();
    return typeof template === typeof variable;
}

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

// tslint:disable-next-line:no-any
export function isObject(obj: any): boolean {
    return obj !== null && obj instanceof Object;
}
