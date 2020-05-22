import { Route } from "Packages/Common/Router/Domain/Types";

export { createLeakReduxState, LeakReduxState } from './Domain/Command/LeakReduxState';
export { createHomePageSaga } from './Domain/Saga/Flow';
export * from './UI/HomePageWC';

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
