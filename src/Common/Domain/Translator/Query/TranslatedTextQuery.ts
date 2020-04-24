import { TranslatorState } from "Common/Domain/Translator/Types";

export function getTranslatedText(
  state: TranslatorState,
  query: TranslatedTextQuery
): string {
  const translation = findTranslatedText(state, query);
  if (translation === null) {
    return query.translationId;
  }
  return translation;
}

export function findTranslatedText( // todo: create selector with reselect library (performance)
  state: TranslatorState,
  query: TranslatedTextQuery
): null | string {
  let translation = state.translations[query.translationId];
  if (translation === undefined) {
    return null;
  }
  if (!query.placeholders) {
    return translation;
  }
  for (const key in query.placeholders) {
    const placeholder = query.placeholders[key];
    translation = translation
      .split(`%${query.placeholders[key]}%`)
      .join(placeholder);
  }
  return translation;
}

export type Placeholders = {
  [key: string]: string;
};

export type TranslatedTextQuery = {
  translationId: string;
  placeholders?: Placeholders;
};
