export function numberToString(value: number, leadingZeros: number, decimals: number = 0): string {
    return value.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        minimumIntegerDigits: leadingZeros,
        useGrouping: false
    });
}