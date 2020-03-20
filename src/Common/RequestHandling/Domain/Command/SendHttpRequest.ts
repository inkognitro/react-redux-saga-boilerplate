import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/RequestHandling/Domain/Command/CommandHandler";
import {RequestExecutionSettings} from "Common/RequestHandling/Domain/HttpRequestManager";

export function createSendHttpGetRequestAction(settings: RequestExecutionSettings): CommandAction {
    const command: SendHttpRequest = {
        type: CommandTypes.SEND_HTTP_REQUEST,
        payload: settings,
    };
    return createCommandAction(command);
}

export type SendHttpRequest = Command<CommandTypes.SEND_HTTP_REQUEST, RequestExecutionSettings>;