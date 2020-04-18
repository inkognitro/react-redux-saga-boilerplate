"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function createUtcDateTimeStringFromUtcTimestamp(timestamp) {
    return moment_1.default.unix(timestamp).utc().format(moment_1.default.defaultFormatUtc);
}
exports.createUtcDateTimeStringFromUtcTimestamp = createUtcDateTimeStringFromUtcTimestamp;
function getUtcDateTimeMinusNowInSeconds(utcDateTimeString) {
    return moment_1.default.duration(moment_1.default(utcDateTimeString).diff(moment_1.default())).asSeconds();
}
exports.getUtcDateTimeMinusNowInSeconds = getUtcDateTimeMinusNowInSeconds;
//# sourceMappingURL=DateTimeHandling.js.map