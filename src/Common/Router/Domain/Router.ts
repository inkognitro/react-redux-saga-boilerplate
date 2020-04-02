import {RouterStateSelector} from "Common/Router/Domain/Types";

export enum RouterCommandTypes {
    OPEN_URL = 'OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
    ADD_REDIRECT = 'ADD_REDIRECT-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
}

export function createRouterSaga(_: RouterStateSelector): () => Generator {
    return function* routerSaga() {

    }
}