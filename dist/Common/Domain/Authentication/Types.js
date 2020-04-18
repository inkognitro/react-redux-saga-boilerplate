"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthEventTypes;
(function (AuthEventTypes) {
    AuthEventTypes["USER_LOGIN_WAS_REQUESTED"] = "USER_LOGIN_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_LOGIN_WAS_CANCELLED"] = "USER_LOGIN_WAS_CANCELLED-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_WAS_LOGGED_IN"] = "USER_WAS_LOGGED_IN-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_LOGIN_FAILED"] = "USER_LOGIN_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_AUTHENTICATION_WAS_REFRESHED"] = "USER_AUTHENTICATION_WAS_REFRESHED-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_AUTHENTICATION_REFRESH_WAS_REQUESTED"] = "USER_AUTHENTICATION_REFRESH_WAS_REQUESTED-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_AUTHENTICATION_REFRESH_FAILED"] = "USER_AUTHENTICATION_REFRESH_FAILED-42db2e56-7772-436f-91bc-17b2ba6798a1";
    AuthEventTypes["USER_WAS_LOGGED_OUT"] = "USER_WAS_LOGGED_OUT-42db2e56-7772-436f-91bc-17b2ba6798a1";
})(AuthEventTypes = exports.AuthEventTypes || (exports.AuthEventTypes = {}));
var AuthCommandTypes;
(function (AuthCommandTypes) {
    AuthCommandTypes["INITIALIZE_CURRENT_USER"] = "INITIALIZE_CURRENT_USER-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3";
    AuthCommandTypes["REFRESH_AUTHENTICATION"] = "REFRESH_AUTHENTICATION-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3";
    AuthCommandTypes["LOGIN"] = "LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3";
    AuthCommandTypes["LOGOUT"] = "LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3";
})(AuthCommandTypes = exports.AuthCommandTypes || (exports.AuthCommandTypes = {}));
//# sourceMappingURL=Types.js.map