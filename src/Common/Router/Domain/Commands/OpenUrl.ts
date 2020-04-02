import {RouterCommandTypes} from "Common/Router/Domain/Router";
import {Command} from "Common/Bootstrap/Command";

export type OpenUrlSettings = {
    url: string,
    target?: string,
    shouldReplaceCurrentUrl?: boolean,
};

export function createOpenUrl(settings: OpenUrlSettings): OpenUrl {
    return {
        type: RouterCommandTypes.OPEN_URL,
        payload: settings
    };
}

export type OpenUrl = Command<RouterCommandTypes.OPEN_URL, OpenUrlSettings>;