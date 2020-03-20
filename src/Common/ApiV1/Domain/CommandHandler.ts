import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {Authenticate} from "Common/ApiV1/Domain/Command/Auth/Authenticate";

export class ApiV1CommandHandler implements CommandHandler {
    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.AUTHENTICATE,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.AUTHENTICATE) {
            console.log('COMMAND');
            console.log(command);
        }
    }
}

type SupportedCommand = (Authenticate);

export enum CommandTypes {
    AUTHENTICATE = 'AUTHENTICATE-f66c7029-a6c4-433a-97b0-7ce46e36e443',
}