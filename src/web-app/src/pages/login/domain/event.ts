import { Event } from 'packages/common/types/util/domain';

export enum LoginPageEventTypes {
    LOGIN_PAGE_WAS_INITIALIZED = 'LOGIN_PAGE_WAS_INITIALIZED-e8dfd12c-6b9d-4334-bd63-c56551f84b39',
}

export type LoginPageWasInitialized = Event<LoginPageEventTypes.LOGIN_PAGE_WAS_INITIALIZED>;
export function createLoginPageWasInitialized(): LoginPageWasInitialized {
    return {
        type: LoginPageEventTypes.LOGIN_PAGE_WAS_INITIALIZED,
        payload: undefined,
    };
}
