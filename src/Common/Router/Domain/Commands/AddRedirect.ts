import {RouterCommandTypes} from "Common/Router/Domain/Router";
import {Redirect} from "Common/Router/Domain/Types";
import {Command} from "Common/Bootstrap/Command";

export function createAddRedirect(redirect: Redirect): AddRedirect {
    return {
        type: RouterCommandTypes.ADD_REDIRECT,
        payload: {redirect}
    };
}

export type AddRedirect = Command<RouterCommandTypes.ADD_REDIRECT, {
    redirect: Redirect
}>;