export function numberToString(value: number, leadingZeros: number): string {
    return (String(0).repeat(leadingZeros) + String(value)).slice(String(value).length);
}