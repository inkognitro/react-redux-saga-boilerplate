import {EventBus} from "Common/AppBase/EventBus";
import {LanguageIds} from "Common/Translator/Domain/Types";
import {createUILanguageWasSet} from "Common/Translator/Domain/Event/UILanguageWasSet";
import {translationIdToTranslationMapping} from "Common/Translator/Domain/Translation/en";
import {findTranslatedText, Placeholders, TranslatorStateSelector} from "Common/Translator/Domain/Selection";

export class Translator {
    private readonly getTranslatorState: TranslatorStateSelector;
    private readonly eventBus: EventBus;

    constructor(getTranslatorState: TranslatorStateSelector, eventBus: EventBus) {
        this.getTranslatorState = getTranslatorState;
        this.eventBus = eventBus;
    }

    setUiLanguage(languageId: LanguageIds): void {
        if (languageId === LanguageIds.EN) {
            this.eventBus.handle(createUILanguageWasSet(languageId, translationIdToTranslationMapping));
            return;
        }
        throw new Error('languageId "' + languageId + '" is not supported');
    }

    findTranslatedText(translationId: string, placeholders?: Placeholders): (null | string) {
        return findTranslatedText(this.getTranslatorState(), translationId, placeholders);
    }
}