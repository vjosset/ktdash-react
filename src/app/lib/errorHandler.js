export const errorHandler = (func) => {
    return func().then(r => [r, null]).catch(e => [null, e]);
}