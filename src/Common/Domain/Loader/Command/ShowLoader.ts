import { Command } from "Common/Domain/Bus/Command";
import { LoaderCommandTypes } from "Common/Domain/Loader/Types";

export function createShowLoader(): ShowLoader {
    return {
        type: LoaderCommandTypes.SHOW_LOADER,
        payload: undefined,
    };
}

export type ShowLoader = Command<LoaderCommandTypes.SHOW_LOADER>;
