import {CommandTypes} from "Common/RequestHandler/Domain/Command/CommandHandler";
import {RequestExecutionSettings} from "Common/RequestHandler/Domain/HttpRequestHandler";
import {Command, CommandAction, createCommandAction} from "Common/Bootstrap/Command";

export function createSendHttpGetRequestAction(settings: RequestExecutionSettings): CommandAction {
    const command: SendHttpRequest = {
        type: CommandTypes.SEND_HTTP_REQUEST,
        payload: settings,
    };
    return createCommandAction(command);
}

export type SendHttpRequest = Command<CommandTypes.SEND_HTTP_REQUEST, RequestExecutionSettings>;