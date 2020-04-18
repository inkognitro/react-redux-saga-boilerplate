"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const SetUILanguageHandling_1 = require("Common/Domain/Translator/Saga/Flow/SetUILanguageHandling");
function createTranslatorFlow(translatorStateSelector) {
    return function* () {
        yield effects_1.spawn(SetUILanguageHandling_1.createWatchSetUILanguageFlow(translatorStateSelector));
    };
}
exports.createTranslatorFlow = createTranslatorFlow;
//# sourceMappingURL=Translator.js.map