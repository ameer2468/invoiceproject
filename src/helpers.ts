export function numberFormat(val: number, decimalPlaces: number) {
    const multiplier = Math.pow(10, decimalPlaces);
    return (Math.round(val * multiplier) / multiplier).toFixed(decimalPlaces);
}
