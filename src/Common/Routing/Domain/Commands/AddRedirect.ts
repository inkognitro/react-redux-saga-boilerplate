import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Routing/Domain/Commands/CommandHandler";
import {Redirect} from "Common/Routing/Domain/Types";

export function createAddRedirect(redirect: Redirect): AddRedirect {
    return {
        type: CommandTypes.ADD_REDIRECT,
        payload: {redirect}
    };
}

export type AddRedirect = Command<CommandTypes.ADD_REDIRECT, {
    redirect: Redirect
}>;