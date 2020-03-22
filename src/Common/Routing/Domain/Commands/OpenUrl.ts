import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Routing/Domain/Commands/CommandHandler";
import {OpenUrlSettings} from "Common/Routing/Domain/Router";

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