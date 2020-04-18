"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTheme(state) {
    return state.theme;
}
exports.getTheme = getTheme;
const defaultTheme = {
    colorText: '#212529',
    colorPrimary: '#007bff',
    colorSecondary: '#b3c2cf',
    colorSuccess: '#28a745',
    colorInfo: '#17a2b8',
    colorWarning: '#ffc107',
    colorError: '#dc3545',
    colorInteractive: '#007bff',
    colorInteracting: '#007bff',
    colorSmoothLineOnWhite: '#ededed',
};
function getDefaultTheme() {
    return defaultTheme;
}
exports.getDefaultTheme = getDefaultTheme;
//# sourceMappingURL=ThemeQuery.js.map