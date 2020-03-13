import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {SaveCookie} from "Common/Cookie/Domain/Command/SaveCookie";

export class CookieCommandHandler implements CommandHandler {

    constructor(cookieManager: CookieManager)

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.SAVE_COOKIE,
        ];
    }

    handle(command: CookieCommands): void {
        if(command.typeId === CommandTypes.SAVE_COOKIE) {

        }
    }
}

type CookieCommands = (SaveCookie);

export enum CommandTypes {
    SAVE_COOKIE = 'SAVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468',
}