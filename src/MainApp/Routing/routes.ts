type Route = {
    routerUrl: string,
};

export const homeRoute: Route = {
    routerUrl: '/',
};
export const createHomeRouteUrl = (): string => {
    return homeRoute.routerUrl;
};

export const loginRoute: Route = {
    routerUrl: '/auth/login',
};
export const createLoginRouteUrl = (): string => {
    return loginRoute.routerUrl;
};