export function getPayloadFromToken(jwt: string): object {
    const base64Payload = jwt.split('.')[1]
        .replace('-', '+')
        .replace('_', '/');
    return JSON.parse(atob(base64Payload));
}