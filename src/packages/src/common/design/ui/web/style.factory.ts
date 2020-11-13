export function createBoxShadowCss(): string {
    return `
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    `;
}
