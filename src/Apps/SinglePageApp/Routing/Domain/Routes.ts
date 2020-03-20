import {UrlSpecification} from "Common/RoutingWIP/Domain/CurrentRouteManager";

export const homeRouteUrlSpecification: UrlSpecification = {
    url: '/',
    shouldMatchExactly: true,
};

export const loginRouteUrlSpecification: UrlSpecification = {
    url: '/auth/login',
    shouldMatchExactly: true,
};

export const createHomeRouteUrl = (): string => {
    return homeRouteUrlSpecification.url;
};

export const createLoginRouteUrl = (): string => {
    return loginRouteUrlSpecification.url;
};

export const createPasswordForgottenUrl = (): string => {
    return 'auth/pwforgotten';
};