import { DesignState } from "Packages/Common/Design/Domain/Types";
import { getDefaultTheme } from "Packages/Common/Design/Domain/Query/ThemeQuery";

const initialDesignState: DesignState = {
    theme: getDefaultTheme(),
};

export function designReducer(state: DesignState = initialDesignState): DesignState {
    return state;
}
