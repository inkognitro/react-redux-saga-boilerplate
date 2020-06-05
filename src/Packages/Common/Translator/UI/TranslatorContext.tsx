import { createContext } from "react";
import { initialTranslatorState} from "Packages/Common/Translator/Domain/Reducer";

const TranslatorContext = createContext(initialTranslatorState);
export const TranslationTextProvider = TranslatorContext.Provider;
export const TranslationTextConsumer = TranslatorContext.Consumer;
