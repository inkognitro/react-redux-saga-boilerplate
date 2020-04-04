import {CommandHandler} from "Common/Bootstrap/CommandActionListener";
import {Authenticate} from "Common/ApiV1WIP/Domain/Command/Auth/Authenticate";
import {AuthenticateHandler} from "Common/ApiV1WIP/Domain/Command/Auth/AuthenticateHandler";
import {RefreshAuthenticationHandler} from "Common/ApiV1WIP/Domain/Command/Auth/RefreshAuthenticationHandler";
import {RefreshAuthentication} from "Common/ApiV1WIP/Domain/Command/Auth/RefreshAuthentication";
import {ApiHttpRequestHandler} from "Common/ApiV1WIP/Domain/ApiHttpRequestHandler";

export class ApiV1CommandHandler implements CommandHandler {
    private readonly authenticateHandler: AuthenticateHandler;
    private readonly refreshAuthenticationHandler: RefreshAuthenticationHandler;

    constructor(apiHttpRequestHandler: ApiHttpRequestHandler) {
        this.authenticateHandler = new AuthenticateHandler(apiHttpRequestHandler);
        this.refreshAuthenticationHandler = new RefreshAuthenticationHandler(apiHttpRequestHandler);
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.AUTHENTICATE,
            CommandTypes.REFRESH_AUTHENTICATION,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.AUTHENTICATE) {
            this.authenticateHandler.handle(command);
            return;
        }
        if(command.type === CommandTypes.REFRESH_AUTHENTICATION) {
            this.refreshAuthenticationHandler.handle(command);
            return;
        }
    }
}

type SupportedCommand = (
    Authenticate
    | RefreshAuthentication
);

export enum CommandTypes {
    AUTHENTICATE = 'AUTHENTICATE-f66c7029-a6c4-433a-97b0-7ce46e36e443',
    REFRESH_AUTHENTICATION = 'REFRESH_AUTHENTICATION-f66c7029-a6c4-433a-97b0-7ce46e36e443',
}