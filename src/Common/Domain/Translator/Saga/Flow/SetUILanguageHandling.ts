import {
    LanguageIds,
    TranslationIdToTranslationMapping,
    TranslatorCommandTypes,
    TranslatorState,
    TranslatorStateSelector,
} from "Common/Domain/Translator/Types";
import { put, select, takeEvery } from "@redux-saga/core/effects";
import { getCurrentLanguageId } from "Common/Domain/Translator/Query/LanguageIdQuery";
import { translationIdToTranslationMapping } from "Common/Domain/Translator/Translation/en";
import { createUILanguageWasSet } from "Common/Domain/Translator/Event/UILanguageWasSet";
import { SetUILanguage } from "Common/Domain/Translator/Command/SetUILanguage";

export function createWatchSetUILanguageFlow(
    translatorStateSelector: TranslatorStateSelector,
): GeneratorFunction {
    const handleSetUILanguage = function* (command: SetUILanguage): Generator {
    // @ts-ignore
        const translatorState: TranslatorState = yield select(
            translatorStateSelector,
        );
        const currentLanguageId = getCurrentLanguageId(translatorState);
        if (command.payload.languageId === currentLanguageId) {
            return;
        }
        if (command.payload.languageId === LanguageIds.EN) {
            const mapping: TranslationIdToTranslationMapping = translationIdToTranslationMapping;
            put(createUILanguageWasSet(command.payload.languageId, mapping));
            return;
        }
        throw new Error(
            `languageId "${command.payload.languageId}" is not supported`,
        );
    };

    return <GeneratorFunction> function* (): Generator {
        yield takeEvery(
            TranslatorCommandTypes.SET_UI_LANGUAGE,
            handleSetUILanguage,
        );
    };
}
