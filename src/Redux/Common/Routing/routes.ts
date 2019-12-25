type Route = {
    routerUrl: string,
};

export const homeRoute: Route = {
    routerUrl: '/',
};

export const createHomeRouteUrl = (): string => {
    return homeRoute.routerUrl;
};