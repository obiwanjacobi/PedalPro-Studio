export function distinct<T>(arrayWithDoubles: T[]): T[] {
    return arrayWithDoubles.filter((v, i, a) => a.indexOf(v) === i);
}