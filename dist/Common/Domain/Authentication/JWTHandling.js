"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateTimeHandling_1 = require("Common/Domain/DateTimeHandling");
function getSecondsUntilExpiration(jwt) {
    const expirationUtcDateTime = getExpirationUTCDateTime(jwt);
    return DateTimeHandling_1.getUtcDateTimeMinusNowInSeconds(expirationUtcDateTime);
}
exports.getSecondsUntilExpiration = getSecondsUntilExpiration;
function getExpirationUTCDateTime(jwt) {
    const payload = getPayloadFromToken(jwt);
    const expirationUtcTimestamp = payload.exp;
    return DateTimeHandling_1.createUtcDateTimeStringFromUtcTimestamp(expirationUtcTimestamp);
}
function getPayloadFromToken(jwt) {
    const base64Payload = getBase64Payload(jwt);
    return JSON.parse(atob(base64Payload));
}
function getBase64Payload(jwt) {
    return getCleanBase64String(jwt.split('.')[1]);
}
function getCleanBase64String(base64JwtPart) {
    return base64JwtPart.replace('-', '+').replace('_', '/');
}
//# sourceMappingURL=JWTHandling.js.map