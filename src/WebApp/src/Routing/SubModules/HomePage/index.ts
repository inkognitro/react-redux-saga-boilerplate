import { Route } from "Packages/Common/Router/Domain";
import { LeakReduxState as LeakReduxStateType } from "./Domain/Command/LeakReduxState";

export type LeakReduxState = LeakReduxStateType;

export { createLeakReduxState } from './Domain/Command/LeakReduxState';
export { createHomePageSaga } from './Domain/Saga/Flow';
export { HomePageWC } from './UI/HomePageWC';

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
