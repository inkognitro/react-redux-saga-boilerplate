import {TranslatorState} from "Common/Translator/Domain/Types";

export type TranslatorStateSelector = () => TranslatorState;

export function findTranslatedText( //todo: create selector with reselect library (performance)
    state: TranslatorState,
    translationId: string,
    placeholders?: Placeholders
): (null | string) {
    let translation = state.translations[translationId];
    if(translation === undefined) {
        return null;
    }
    for(let key in placeholders) {
        const placeholder = placeholders[key];
        translation = translation.split('%' + placeholders[key] + '%').join(placeholder);
    }
    return translation;
}

export type Placeholders = {
    [key: string]: string;
};