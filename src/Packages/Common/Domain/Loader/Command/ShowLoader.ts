import { Command } from "Packages/Common/Domain/Bus/Command";
import { LoaderCommandTypes } from "Packages/Common/Domain/Loader/Types";

export function createShowLoader(): ShowLoader {
    return {
        type: LoaderCommandTypes.SHOW_LOADER,
        payload: undefined,
    };
}

export type ShowLoader = Command<LoaderCommandTypes.SHOW_LOADER>;
