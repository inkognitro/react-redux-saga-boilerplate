"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
const initialAuthState = {
    isAuthenticationRunning: false,
    currentAuthUser: null,
};
function authenticationReducer(state = initialAuthState, event) {
    if (!event) {
        return state;
    }
    if (event.type === Types_1.AuthEventTypes.USER_LOGIN_WAS_REQUESTED) {
        return Object.assign(Object.assign({}, state), { isAuthenticationRunning: true });
    }
    if (event.type === Types_1.AuthEventTypes.USER_WAS_LOGGED_IN) {
        return Object.assign(Object.assign({}, state), { currentAuthUser: event.payload.authUser, isAuthenticationRunning: false });
    }
    if (event.type === Types_1.AuthEventTypes.USER_LOGIN_FAILED) {
        return Object.assign(Object.assign({}, state), { currentAuthUser: null, isAuthenticationRunning: false });
    }
    if (event.type === Types_1.AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED) {
        return Object.assign(Object.assign({}, state), { isAuthenticationRunning: true });
    }
    if (event.type === Types_1.AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED) {
        return Object.assign(Object.assign({}, state), { currentAuthUser: event.payload.authUser, isAuthenticationRunning: false });
    }
    if (event.type === Types_1.AuthEventTypes.USER_LOGIN_WAS_CANCELLED) {
        return Object.assign(Object.assign({}, state), { currentAuthUser: null, isAuthenticationRunning: false });
    }
    if (event.type === Types_1.AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED) {
        return Object.assign(Object.assign({}, state), { currentAuthUser: null, isAuthenticationRunning: false });
    }
    if (event.type === Types_1.AuthEventTypes.USER_WAS_LOGGED_OUT) {
        return Object.assign(Object.assign({}, state), { currentAuthUser: null });
    }
    return state;
}
exports.authenticationReducer = authenticationReducer;
//# sourceMappingURL=Reducer.js.map