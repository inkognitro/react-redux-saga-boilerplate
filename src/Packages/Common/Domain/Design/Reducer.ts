import { DesignState } from "Packages/Common/Domain/Design/Types";
import { getDefaultTheme } from "Packages/Common/Domain/Design/Query/ThemeQuery";

const initialDesignState: DesignState = {
    theme: getDefaultTheme(),
};

export function designReducer(state: DesignState = initialDesignState): DesignState {
    return state;
}
