import { Command } from "Packages/Entity/CommonTypes";
import { LoaderCommandTypes } from "../Types";

export function createShowLoader(): ShowLoader {
    return {
        type: LoaderCommandTypes.SHOW_LOADER,
        payload: undefined,
    };
}

export type ShowLoader = Command<LoaderCommandTypes.SHOW_LOADER>;
