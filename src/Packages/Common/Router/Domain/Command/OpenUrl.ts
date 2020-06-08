import { Command } from "Packages/Entity/CommonTypes";
import { RouterCommandTypes } from "../Types";

export function createOpenUrl(settings: OpenUrlSettings): OpenUrl {
    return {
        type: RouterCommandTypes.OPEN_URL,
        payload: settings,
    };
}

export type OpenUrl = Command<RouterCommandTypes.OPEN_URL, OpenUrlSettings>;

export type OpenUrlSettings = {
  url: string;
  target?: string;
  shouldReplaceCurrentUrl?: boolean;
};
