"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findCurrentAuthUser(state) {
    if (state.currentAuthUser) {
        return state.currentAuthUser;
    }
    return null;
}
exports.findCurrentAuthUser = findCurrentAuthUser;
function isAuthenticationRunning(state) {
    return state.isAuthenticationRunning;
}
exports.isAuthenticationRunning = isAuthenticationRunning;
//# sourceMappingURL=CurrentAuthUserQuery.js.map