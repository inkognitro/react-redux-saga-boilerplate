import {Action} from "redux";
import {DesignState} from "Common/Domain/Design/Types";
import {getDefaultTheme} from "Common/Domain/Design/Query/ThemeQuery";

const initialDesignState: DesignState = {
    theme: getDefaultTheme(),
};

export function designReducer(state: DesignState = initialDesignState, _: Action): DesignState {
    return state;
}