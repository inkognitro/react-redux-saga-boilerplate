import {ToasterEvent} from "Common/Toaster/Domain/Types";
import {LanguageIds, TranslatorEventTypes, TranslatorState} from "Common/Translator/Domain/Types";
import {translationIdToTranslationMapping} from "Common/Translator/Domain/Translation/en";

const initialTranslatorState: TranslatorState = {
    currentLanguageId: LanguageIds.EN,
    translations: translationIdToTranslationMapping
};

export function translator(state: TranslatorState = initialTranslatorState, event?: ToasterEvent): TranslatorState {
    if (!event) {
        return state;
    }

    if(event.type === TranslatorEventTypes.UI_LANGUAGE_WAS_SET) {

    }

    return state;
}