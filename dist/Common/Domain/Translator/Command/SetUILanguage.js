"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Translator/Types");
function createSetUILanguage(languageId) {
    return {
        type: Types_1.TranslatorCommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId: languageId
        },
    };
}
exports.createSetUILanguage = createSetUILanguage;
//# sourceMappingURL=SetUILanguage.js.map