"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTranslatedText(state, query) {
    const translation = findTranslatedText(state, query);
    if (translation === null) {
        return query.translationId;
    }
    return translation;
}
exports.getTranslatedText = getTranslatedText;
function findTranslatedText(state, query) {
    let translation = state.translations[query.translationId];
    if (translation === undefined) {
        return null;
    }
    if (!query.placeholders) {
        return translation;
    }
    for (let key in query.placeholders) {
        const placeholder = query.placeholders[key];
        translation = translation.split('%' + query.placeholders[key] + '%').join(placeholder);
    }
    return translation;
}
exports.findTranslatedText = findTranslatedText;
//# sourceMappingURL=TranslatedTextQuery.js.map