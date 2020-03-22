import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {Login} from "Common/Auth/Domain/Command/Login";
import {RefreshAuthentication} from "Common/Auth/Domain/Command/RefreshAuthentication";
import {Logout} from "Common/Auth/Domain/Command/Logout";
import {InitializeCurrentUser} from "Common/Auth/Domain/Command/InitializeCurrentUser";

export class AuthCommandHandler implements CommandHandler {
    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.INITIALIZE_CURRENT_USER,
            CommandTypes.LOGIN,
            CommandTypes.REFRESH_AUTHENTICATION,
            CommandTypes.LOGOUT,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.INITIALIZE_CURRENT_USER) {
            //todo
            return;
        }
        if(command.type === CommandTypes.LOGIN) {
            //todo
            return;
        }
        if(command.type === CommandTypes.REFRESH_AUTHENTICATION) {
            //todo
            return;
        }
        if(command.type === CommandTypes.LOGOUT) {
            //todo
            return;
        }
    }
}

type SupportedCommand = (Login | RefreshAuthentication | Logout | InitializeCurrentUser);

export enum CommandTypes {
    INITIALIZE_CURRENT_USER = 'INITIALIZE_CURRENT_USER-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGIN = 'LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    REFRESH_AUTHENTICATION = 'REFRESH_AUTHENTICATION-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGOUT = 'LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
}