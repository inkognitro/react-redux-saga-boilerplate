import { createContext } from "react";
import { initialTranslatorState } from "../domain";

const Context = createContext(initialTranslatorState);
export const TranslationTextProvider = Context.Provider;
export const TranslationTextConsumer = Context.Consumer;
