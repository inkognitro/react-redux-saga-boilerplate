export function createBoxShadowCss(): string {
    return `
        -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
        -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
    `;
}