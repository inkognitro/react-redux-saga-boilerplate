import {TranslatorState} from "Common/Translator/Domain/Types";

export function getTranslatedText( //todo: create selector with reselect library (performance)
    state: TranslatorState,
    query: TranslatedTextQuery
): (null | string) {
    let translation = state.translations[query.translationId];
    if (translation === undefined) {
        return query.translationId;
    }
    if(!query.placeholders) {
        return translation;
    }
    for (let key in query.placeholders) {
        const placeholder = query.placeholders[key];
        translation = translation.split('%' + query.placeholders[key] + '%').join(placeholder);
    }
    return translation;
}

export type Placeholders = {
    [key: string]: string;
};

export type TranslatedTextQuery = {
    translationId: string,
    placeholders?: Placeholders,
};