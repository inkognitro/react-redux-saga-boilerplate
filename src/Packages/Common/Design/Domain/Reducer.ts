import { DesignState } from "./Types";
import { getDefaultTheme } from "./Query/ThemeQuery";

const initialDesignState: DesignState = {
    theme: getDefaultTheme(),
};

export function designReducer(state: DesignState = initialDesignState): DesignState {
    return state;
}
