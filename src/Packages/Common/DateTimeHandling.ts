import moment from "moment";

export function createUtcDateTimeStringFromUtcTimestamp(timestamp: number): string {
    return moment.unix(timestamp).utc().format(moment.defaultFormatUtc);
}

export function getUtcDateTimeMinusNowInSeconds(utcDateTimeString: string): number {
    return moment.duration(moment(utcDateTimeString).diff(moment())).asSeconds();
}
