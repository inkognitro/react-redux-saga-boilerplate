import { v4 as uuidV4 } from 'uuid';

type Payload = {
    iat: number
    exp: number
    sub: string
    jti: string
}

function getBase64WithoutEqualSignsInTheEnd (base64String: string): string {
    return base64String
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export function createPseudoJWT(userId: string): string {
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };
    const payload = {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 120,
        sub: userId,
        jti: uuidV4(),
    };
    const base64Header = getBase64WithoutEqualSignsInTheEnd(btoa(JSON.stringify(header)));
    const base64Payload = getBase64WithoutEqualSignsInTheEnd(btoa(JSON.stringify(payload)));
    return [base64Header, base64Payload].join('.');
}

export function findSecondsUntilExpiration(jwt: string): null | number {
    const expirationTimestamp = findExpirationUTCTimestamp(jwt);
    if (expirationTimestamp === undefined) {
        return null;
    }
    return (expirationTimestamp - getNowTimestamp());
}

function getNowTimestamp(): number {
    return Math.floor(Date.now() / 1000);
}

function findExpirationUTCTimestamp(jwt: string): (undefined | number) {
    const payload = getPayloadFromToken(jwt);
    return payload.exp;
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
