import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";
import {Redirect} from "Common/Routing/Domain/Types";
import {CommandTypes} from "Common/Routing/Domain/Commands/CommandHandler";

export function createAddRedirectAction(redirect: Redirect): CommandAction {
    return createCommandAction(createAddRedirect(redirect));
}

export function createAddRedirect(redirect: Redirect): AddRedirect {
    return {
        type: CommandTypes.ADD_REDIRECT,
        payload: {
            redirect: redirect
        }
    };
}

export type AddRedirect = Command<CommandTypes.ADD_REDIRECT, {
    redirect: Redirect
}>;