import {
    createUtcDateTimeStringFromUtcTimestamp,
    getUtcDateTimeMinusNowInSeconds,
} from "Packages/Common/DateTimeHandling";

type Payload = {
  iat: number;
  exp: number;
  sub: string;
  jti: string;
};

export function getSecondsUntilExpiration(jwt: string): number {
    const expirationUtcDateTime = getExpirationUTCDateTime(jwt);
    return getUtcDateTimeMinusNowInSeconds(expirationUtcDateTime);
}

function getExpirationUTCDateTime(jwt: string): string {
    const payload = getPayloadFromToken(jwt);
    const expirationUtcTimestamp = payload.exp;
    return createUtcDateTimeStringFromUtcTimestamp(expirationUtcTimestamp);
}

function getPayloadFromToken(jwt: string): Payload {
    const base64Payload = getBase64Payload(jwt);
    return JSON.parse(atob(base64Payload));
}

function getBase64Payload(jwt: string): string {
    return getCleanBase64String(jwt.split(".")[1]);
}

function getCleanBase64String(base64JwtPart: string): string {
    return base64JwtPart.replace("-", "+").replace("_", "/");
}
