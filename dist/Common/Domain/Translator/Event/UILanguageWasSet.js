"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Translator/Types");
function createUILanguageWasSet(languageId, translationIdToTranslationMapping) {
    return {
        type: Types_1.TranslatorEventTypes.UI_LANGUAGE_WAS_SET,
        payload: {
            languageId: languageId,
            translationIdToTranslationMapping: translationIdToTranslationMapping,
        }
    };
}
exports.createUILanguageWasSet = createUILanguageWasSet;
//# sourceMappingURL=UILanguageWasSet.js.map