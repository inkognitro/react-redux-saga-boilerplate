import { TextFieldState } from "packages/common/FormElement/Domain";
import { Route } from "packages/common/Router/Domain";

export type HomePageState = {
    toastContent: TextFieldState
}

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
