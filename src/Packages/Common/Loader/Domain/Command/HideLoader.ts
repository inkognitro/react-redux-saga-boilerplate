import { Command } from "Packages/Common/CommonTypes";
import { LoaderCommandTypes } from "../Types";

export function createHideLoader(): HideLoader {
    return {
        type: LoaderCommandTypes.HIDE_LOADER,
        payload: undefined,
    };
}

export type HideLoader = Command<LoaderCommandTypes.HIDE_LOADER>;
