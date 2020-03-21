import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {Authenticate} from "Common/Auth/Domain/Command/Authenticate";

export class AuthCommandHandler implements CommandHandler {
    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.AUTHENTICATE,
            CommandTypes.REFRESH_TOKEN,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.AUTHENTICATE) {
            //todo
            return;
        }
    }
}

type SupportedCommand = (
    Authenticate
);

export enum CommandTypes {
    AUTHENTICATE = 'AUTHENTICATE-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    REFRESH_TOKEN = 'REFRESH_TOKEN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
}