import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {Login} from "Common/Auth/Domain/Command/Login";
import {Logout} from "Common/Auth/Domain/Command/Logout";
import {InitializeCurrentUser} from "Common/Auth/Domain/Command/InitializeCurrentUser";
import {AuthManager} from "Common/Auth/Domain/AuthManager";

export class AuthCommandHandler implements CommandHandler {
    private readonly authManager: AuthManager;

    constructor(authManager: AuthManager) {
        this.authManager = authManager;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.INITIALIZE_CURRENT_USER,
            CommandTypes.LOGIN,
            CommandTypes.LOGOUT,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.INITIALIZE_CURRENT_USER) {
            this.authManager.initializeCurrentUser();
            return;
        }
        if(command.type === CommandTypes.LOGIN) {
            this.authManager.login(command.payload);
            return;
        }
        if(command.type === CommandTypes.LOGOUT) {
            this.authManager.logout();
            return;
        }
    }
}

type SupportedCommand = (Login | Logout | InitializeCurrentUser);

export enum CommandTypes {
    INITIALIZE_CURRENT_USER = 'INITIALIZE_CURRENT_USER-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGIN = 'LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGOUT = 'LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
}