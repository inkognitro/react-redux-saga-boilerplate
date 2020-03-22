import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {Authenticate} from "Common/ApiV1/Domain/Command/Auth/Authenticate";
import {AuthenticateHandler} from "Common/ApiV1/Domain/Command/Auth/AuthenticateHandler";
import {RefreshTokenHandler} from "Common/ApiV1/Domain/Command/Auth/RefreshTokenHandler";
import {RefreshToken} from "Common/ApiV1/Domain/Command/Auth/RefreshToken";

export class ApiV1CommandHandler implements CommandHandler {
    private readonly authenticateHandler: AuthenticateHandler;
    private readonly refreshTokenHandler: RefreshTokenHandler;

    constructor(
        authenticateHandler: AuthenticateHandler,
        refreshTokenHandler: RefreshTokenHandler
    ) {
        this.authenticateHandler = authenticateHandler;
        this.refreshTokenHandler = refreshTokenHandler;
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
            this.refreshTokenHandler.handle(command);
            return;
        }
    }
}

type SupportedCommand = (
    Authenticate
    | RefreshToken
);

export enum CommandTypes {
    AUTHENTICATE = 'AUTHENTICATE-f66c7029-a6c4-433a-97b0-7ce46e36e443',
    REFRESH_AUTHENTICATION = 'REFRESH_AUTHENTICATION-f66c7029-a6c4-433a-97b0-7ce46e36e443',
}