import {
    LanguageIds,
    TranslationIdToTranslationMapping,
    TranslatorState,
    TranslatorStateSelector
} from "Common/Domain/Translator/Types";
import {TranslatorCommandTypes} from "Common/Domain/Translator/Translator";
import {Command} from "Common/Domain/Bus/Command";
import {put, select, takeEvery} from "@redux-saga/core/effects";
import {createUILanguageWasSet} from "Common/Domain/Translator/Event/UILanguageWasSet";
import {getCurrentLanguageId} from "Common/Domain/Translator/Query/LanguageIdQuery";
import {translationIdToTranslationMapping} from 'Common/Domain/Translator/Translation/en';

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