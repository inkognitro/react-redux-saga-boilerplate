import { createContext } from "react";
import { initialTranslatorState } from "./domain";

const TranslatorContext = createContext(initialTranslatorState);
export const TranslationTextProvider = TranslatorContext.Provider;
export const TranslationTextConsumer = TranslatorContext.Consumer;
