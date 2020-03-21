import {CommandBus} from "Common/AppBase/CommandBus";
import {createAuthenticate} from "Common/ApiV1/Domain/Command/Auth/Authenticate";

export type AuthenticateSettings = {
    username: string,
    password: string,
    shouldRemember: boolean
};

export class AuthManager {
    private readonly commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    login(settings: AuthenticateSettings): void {



        createAuthenticate()
    }
}