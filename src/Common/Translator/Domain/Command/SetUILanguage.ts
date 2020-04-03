import {
    LanguageIds,
    TranslationIdToTranslationMapping,
    TranslatorState,
    TranslatorStateSelector
} from "Common/Translator/Domain/Types";
import {TranslatorCommandTypes} from "Common/Translator/Domain/Translator";
import {Command} from "Common/Bootstrap/Command";
import {put, select, takeEvery} from "@redux-saga/core/effects";
import {createUILanguageWasSet} from "Common/Translator/Domain/Event/UILanguageWasSet";
import {getCurrentLanguageId} from "Common/Translator/Domain/Query/LanguageIdQuery";
import {translationIdToTranslationMapping} from 'Common/Translator/Domain/Translation/en';

export function createWatchSetUILanguageSaga(translatorStateSelector: TranslatorStateSelector): GeneratorFunction {
    const handleSetUILanguage = function* (command: SetUILanguage): Generator {
        //@ts-ignore
        const translatorState: TranslatorState = yield select(translatorStateSelector);
        const currentLanguageId = getCurrentLanguageId(translatorState);
        if(command.payload.languageId === currentLanguageId) {
            return;
        }
        if (command.payload.languageId === LanguageIds.EN) {
            const mapping: TranslationIdToTranslationMapping = translationIdToTranslationMapping;
            put(createUILanguageWasSet(command.payload.languageId, mapping));
            return;
        }
        throw new Error('languageId "' + command.payload.languageId + '" is not supported');
    };

    return <GeneratorFunction>function* watchSetUILanguage(): Generator {
        yield takeEvery(TranslatorCommandTypes.SET_UI_LANGUAGE, handleSetUILanguage);
    }
}

export function createSetUILanguage(languageId: LanguageIds): SetUILanguage {
    return {
        type: TranslatorCommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId: languageId
        },
    };
}

export type SetUILanguage = Command<TranslatorCommandTypes.SET_UI_LANGUAGE, {
    languageId: LanguageIds
}>;