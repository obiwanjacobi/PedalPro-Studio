export interface TypeDefaultConstructor<T> {
    new (): T;
}

export interface TypeParamsConstructor<T> {
    // tslint:disable-next-line:no-any
    new (...args: any[]): T;
}
