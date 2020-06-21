import { TextFieldState } from "Packages/Common/FormElement/Domain";
import {Route} from "Packages/Common/Router/Domain";

export type HomePageState = {
    toastContent: TextFieldState
}

export const homeRoute: Route = {
    urlSchema: "/",
    urlMustMatchExactly: true,
};
