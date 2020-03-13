import {CommandTypes} from "Common/Cookie/Domain/Command/CommandHandler";
import {CommandAction, createCommandAction} from "Common/AppBase/CommandBus";

export function createSaveCookieCommandAction(settings: SaveCookieSettings): CommandAction {
    const command: SaveCookie = {
        typeId: CommandTypes.SAVE_COOKIE,
        payload: settings,
    };
    return createCommandAction(command);
}

export type SaveCookie = {
    typeId: CommandTypes.SAVE_COOKIE,
    payload: SaveCookieSettings
};

type SaveCookieSettings = {
    name: string,
    content: string,
    timeToLiveInDays?: number,
};