import {EventBus} from "Common/Bootstrap/EventBus";
import {LanguageIds} from "Common/Translator/Domain/Types";
import {createUILanguageWasSet} from "Common/Translator/Domain/Event/UILanguageWasSet";
import {translationIdToTranslationMapping} from "Common/Translator/Domain/Translation/en";

export class TranslatorOld {
    private readonly eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    setUiLanguage(languageId: LanguageIds): void {
        if (languageId === LanguageIds.EN) {
            this.eventBus.handle(createUILanguageWasSet(languageId, translationIdToTranslationMapping));
            return;
        }
        throw new Error('languageId "' + languageId + '" is not supported');
    }
}