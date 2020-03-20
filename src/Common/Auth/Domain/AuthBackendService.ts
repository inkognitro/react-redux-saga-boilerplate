import {User} from "Common/UserManagement/Domain/UserRepository/Types";

type callbackSettings = {
    onSuccess?(authData: AuthData): void,
    onError?(): void,
};

export type ReceiveAuthDataSettings = (callbackSettings & {
    username: string,
    password: string,
    isLoaderEnabled: boolean,
});

export type ReceiveRefreshedAuthDataSettings = (callbackSettings & {
    apiToken: string,
    isLoaderEnabled: boolean,
});

export type AuthData = {
    token: string,
    user: User
};

export interface AuthBackendService {
    receiveAuthData(settings: ReceiveAuthDataSettings): void
    receiveRefreshedAuthData(settings: ReceiveRefreshedAuthDataSettings): void
}