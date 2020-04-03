import {HttpRequestHandlerCommandTypes} from "Common/RequestHandler/Domain/HttpRequestHandler";
import {RequestExecutionSettings} from "Common/RequestHandler/Domain/HttpRequestHandlerOld";
import {Command} from "Common/Bootstrap/Domain/Command";



export function createSendHttpGetRequest(settings: RequestExecutionSettings): SendHttpRequest {
    return {
        type: HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST,
        payload: settings,
    };
}

export type SendHttpRequest = Command<HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST, RequestExecutionSettings>;