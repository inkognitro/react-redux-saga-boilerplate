import {spawn} from "@redux-saga/core/effects";

export enum ApiV1CommandTypes {
    AUTHENTICATE = 'AUTHENTICATE-47406dac-1dc9-4831-a20a-ac917a944ddb',
    REFRESH_AUTHENTICATION = 'REFRESH_AUTHENTICATION-47406dac-1dc9-4831-a20a-ac917a944ddb',
}

export function createApiV1Saga(): () => Generator {
    return function* apiV1Saga() {
        yield spawn();
    }
}

export const apiV1BaseUrl = '//localhost:9000';