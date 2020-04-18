"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThemeQuery_1 = require("Common/Domain/Design/Query/ThemeQuery");
const initialDesignState = {
    theme: ThemeQuery_1.getDefaultTheme(),
};
function designReducer(state = initialDesignState, _) {
    return state;
}
exports.designReducer = designReducer;
//# sourceMappingURL=Reducer.js.map