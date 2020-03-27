import {CommandTypes} from "Common/Routing/Domain/Commands/CommandHandler";
import {OpenUrlSettings} from "Common/Routing/Domain/Router";
import {Command, CommandAction, createCommandAction} from "Common/Bootstrap/Command";

export function createOpenUrlAction(settings: OpenUrlSettings): CommandAction {
    return createCommandAction(createOpenUrl(settings));
}

export function createOpenUrl(settings: OpenUrlSettings): OpenUrl {
    return {
        type: CommandTypes.OPEN_URL,
        payload: settings
    };
}

export type OpenUrl = Command<CommandTypes.OPEN_URL, OpenUrlSettings>;