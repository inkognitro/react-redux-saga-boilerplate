import { createContext, useContext } from "react";
import { initialTranslatorState, TranslatorState } from "../domain";

const context = createContext(initialTranslatorState);
export const TranslationTextProvider = context.Provider;

export function useTranslatorState(): TranslatorState {
    return useContext(context);
}
