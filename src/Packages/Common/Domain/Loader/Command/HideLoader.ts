import { Command } from "Packages/Common/Domain/Bus/Command";
import { LoaderCommandTypes } from "Packages/Common/Domain/Loader/Types";

export function createHideLoader(): HideLoader {
    return {
        type: LoaderCommandTypes.HIDE_LOADER,
        payload: undefined,
    };
}

export type HideLoader = Command<LoaderCommandTypes.HIDE_LOADER>;
