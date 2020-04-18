"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Translator/Types");
const effects_1 = require("@redux-saga/core/effects");
const LanguageIdQuery_1 = require("Common/Domain/Translator/Query/LanguageIdQuery");
const en_1 = require("Common/Domain/Translator/Translation/en");
const UILanguageWasSet_1 = require("Common/Domain/Translator/Event/UILanguageWasSet");
function createWatchSetUILanguageFlow(translatorStateSelector) {
    const handleSetUILanguage = function* (command) {
        const translatorState = yield effects_1.select(translatorStateSelector);
        const currentLanguageId = LanguageIdQuery_1.getCurrentLanguageId(translatorState);
        if (command.payload.languageId === currentLanguageId) {
            return;
        }
        if (command.payload.languageId === Types_1.LanguageIds.EN) {
            const mapping = en_1.translationIdToTranslationMapping;
            effects_1.put(UILanguageWasSet_1.createUILanguageWasSet(command.payload.languageId, mapping));
            return;
        }
        throw new Error('languageId "' + command.payload.languageId + '" is not supported');
    };
    return function* () {
        yield effects_1.takeEvery(Types_1.TranslatorCommandTypes.SET_UI_LANGUAGE, handleSetUILanguage);
    };
}
exports.createWatchSetUILanguageFlow = createWatchSetUILanguageFlow;
//# sourceMappingURL=SetUILanguageHandling.js.map