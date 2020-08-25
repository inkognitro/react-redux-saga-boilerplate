import { DesignState } from "./types";
import { getDefaultTheme } from "./query";

const initialDesignState: DesignState = {
    theme: getDefaultTheme(),
};

export function designReducer(state: DesignState = initialDesignState): DesignState {
    return state;
}
