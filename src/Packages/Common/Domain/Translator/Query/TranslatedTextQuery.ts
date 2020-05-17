import { TranslatorState } from "Packages/Common/Domain/Translator/Types";
import { Translation } from "Entity/Domain/Translation";

export function findTranslatedText(state: TranslatorState, translation: Translation): null | string {
    let translatedText = state.translations[translation.translationId];
    if (translatedText === undefined) {
        return null;
    }
    if (!translation.placeholders) {
        return translatedText;
    }
    for (const key in translation.placeholders) {
        const placeholder = translation.placeholders[key];
        translatedText = translatedText
            .split(`%${translation.placeholders[key]}%`)
            .join(placeholder);
    }
    return translatedText;
}
