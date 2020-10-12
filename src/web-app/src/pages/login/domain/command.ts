import { Command } from 'packages/common/types/util/domain';

export enum LoginPageCommandTypes {
    INITIALIZE = 'INITIALIZE-e8dfd12c-6b9d-4334-bd63-c56551f84b39',
    LOGIN = 'LOGIN-e8dfd12c-6b9d-4334-bd63-c56551f84b39',
}

export type Initialize = Command<LoginPageCommandTypes.INITIALIZE>;
export function createInitialize(): Initialize {
    return {
        type: LoginPageCommandTypes.INITIALIZE,
        payload: undefined,
    };
}

export type Login = Command<LoginPageCommandTypes.LOGIN>;
export function createLogin(): Login {
    return {
        type: LoginPageCommandTypes.LOGIN,
        payload: undefined,
    };
}
