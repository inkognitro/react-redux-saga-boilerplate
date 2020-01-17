import moment from 'moment';

export function createUtcNowDateTimeString(): string {
    return moment().utc().format(moment.defaultFormatUtc);
}

export function getDateMinusNowInSeconds(dateTimeString: string): number {
    return moment.duration(moment(dateTimeString).diff(moment())).asSeconds();
}