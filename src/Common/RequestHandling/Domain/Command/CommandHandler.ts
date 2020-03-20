import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {HttpRequestManager} from "Common/RequestHandling/Domain/HttpRequestManager";
import {SendHttpRequest} from "Common/RequestHandling/Domain/Command/SendHttpRequest";

export class RequestCommandHandler implements CommandHandler {
    private readonly httpRequestManager: HttpRequestManager;

    constructor(httpRequestManager: HttpRequestManager) {
        this.httpRequestManager = httpRequestManager;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.SEND_HTTP_REQUEST,
        ];
    }

    handle(command: RequestCommands): void {
        if(command.type === CommandTypes.SEND_HTTP_REQUEST) {
            this.httpRequestManager.executeRequest(command.payload);
        }
    }
}

type RequestCommands = (SendHttpRequest);

export enum CommandTypes {
    SEND_HTTP_REQUEST = 'SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064',
}