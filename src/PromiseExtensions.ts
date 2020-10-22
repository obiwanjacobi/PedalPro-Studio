export function fulfillPromise(promise: Promise<void>): void {
    if (promise) {
        promise
            .then(_ => { /**/ })
            .catch(e => { throw e; });
    }
}