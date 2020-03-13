import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {SaveCookie} from "Common/Cookie/Domain/Command/SaveCookie";
import {CookieManager} from "Common/Cookie/Domain/CookieManager";

export class CookieCommandHandler implements CommandHandler {
    private readonly cookieManager: CookieManager;

    constructor(cookieManager: CookieManager) {
        this.cookieManager = cookieManager;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.SAVE_COOKIE,
        ];
    }

    handle(command: CookieCommands): void {
        if(command.type === CommandTypes.SAVE_COOKIE) {
            this.cookieManager.saveCookie(command.payload);
        }
    }
}

type CookieCommands = (SaveCookie);

export enum CommandTypes {
    SAVE_COOKIE = 'SAVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468',
}