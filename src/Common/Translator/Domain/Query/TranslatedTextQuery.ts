import {TranslatorState, TranslatorStateSelector} from "Common/Translator/Domain/Types";

export function findTranslatedText( //todo: create selector with reselect library (performance)
    state: TranslatorState,
    query: TranslatedTextQuery
): (null | string) {
    let translation = state.translations[query.translationId];
    if (translation === undefined) {
        return null;
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

export class TranslatedTextReader {
    private readonly getTranslatorState: TranslatorStateSelector;

    constructor(getTranslatorState: TranslatorStateSelector) {
        this.getTranslatorState = getTranslatorState;
    }

    public find(query: TranslatedTextQuery): (null | string) {
        return findTranslatedText(this.getTranslatorState(), query);
    }
}