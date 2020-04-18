"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Translator/Types");
const en_1 = require("Common/Domain/Translator/Translation/en");
const initialTranslatorState = {
    currentLanguageId: Types_1.LanguageIds.EN,
    translations: en_1.translationIdToTranslationMapping
};
function translatorReducer(state = initialTranslatorState, event) {
    if (!event) {
        return state;
    }
    if (event.type === Types_1.TranslatorEventTypes.UI_LANGUAGE_WAS_SET) {
        return Object.assign(Object.assign({}, state), { currentLanguageId: event.payload.languageId, translations: event.payload.translationIdToTranslationMapping });
    }
    return state;
}
exports.translatorReducer = translatorReducer;
//# sourceMappingURL=Reducer.js.map