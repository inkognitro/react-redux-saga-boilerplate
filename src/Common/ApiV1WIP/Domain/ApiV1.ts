import {spawn} from "@redux-saga/core/effects";

export enum ApiV1CommandTypes {
    FOO = 'FOO-47406dac-1dc9-4831-a20a-ac917a944ddb', //todo: remove!
}

export function createApiV1Saga(): () => Generator {
    return function* apiV1Saga() {
        yield spawn();
    }
}