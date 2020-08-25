import { TextFieldState } from "packages/common/form-element/domain";
import { Route } from "packages/common/router/domain";

export type HomePageState = {
    toastContent: TextFieldState
}

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
