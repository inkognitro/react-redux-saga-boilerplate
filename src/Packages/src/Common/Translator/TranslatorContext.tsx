import { createContext } from "react";
import { initialTranslatorState } from "./Domain";

const TranslatorContext = createContext(initialTranslatorState);
export const TranslationTextProvider = TranslatorContext.Provider;
export const TranslationTextConsumer = TranslatorContext.Consumer;
